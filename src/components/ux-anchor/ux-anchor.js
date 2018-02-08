import Ractive from 'ractive';
import { enter } from 'ractive-events-keys';
import mock from './ux-anchor-mock.js';
import './ux-anchor.scss';
import template from './ux-anchor.html';
import {unescapeHTMLSymbol} from '../../core/ractiveHelpers.js'
export default Ractive.extend({
	template,
	isolated: true,
	events: {
		enter
	},
	data: function () {
		return {
			unescapeSymbol: unescapeHTMLSymbol
		};
	},
	computed: {
		guid: function () {
			return this._guid;
		},
		anchorUrl: function () {
			return window.location.href.replace(location.hash, '') + '#' + this.get('id');
		}
	},
	fireEvent: function (event,customEvent,selfObj) {
		if (customEvent) {
			var customParams = customEvent.split(':');
			var customEventName = customParams[0];
			if (customParams.length > 1) {
				var params = customParams[1].split(',');
				//selfObj.fire(customEventName, this, params);
				selfObj.fire.apply(this, [customEventName, this].concat(params));
			} else {
				selfObj.fire(customEvent, this);
			}
			event.original.preventDefault();
		}
	},
	onconfig: function () {
		var self = this;
		this.on('anchorClicked', function (event) {
			event.original.preventDefault();
			//anchor with href is not redirecting on click, takingg multiple clicks so forcefully redirecting
			if (!self.get('target') && self.get('href')) {
				var customEvent = this.get('ontap') || this.get('onclick');
				this.fireEvent(event, customEvent, this);
				window.location.href = self.get('href');
			} else {
				if (self.get('type') === 'anchor') {
					var targetId = self.get('id');
					var target = $('#' + targetId);
					//if anchor target is inside tab, select this tab.
					var tabContainer = target.parents('.ux-fixed-tabs');
					if (tabContainer.length > 0) {
						var textCarousel = Ractive.getNodeInfo(tabContainer.find('.ux-carousel-text')[0]).ractive,
							accordionItem = Ractive.getNodeInfo(target.
							parents('.ux-accordion-vertical-item')[0]).ractive;
						var targetTabId = accordionItem.get('id'),
							currentSelectedTab = textCarousel.get('textSelectedIndex'),
							targetTab = _.findIndex(accordionItem.get('labels'), function (label) {
								return label.tabId === targetTabId;
							});
						if (currentSelectedTab !== targetTab) {
							textCarousel.set('textSelectedIndex', targetTab);
						}
					}
					//if anchor target is inside accordion, open accordion.
					var accordionList = target.parents('.ux-accordion-vertical-item');
					if (accordionList.length < 0) {
						accordionList = target.parents('.ux-accordion-sd');
					}
					if (accordionList.length > 0) {
						_.each(accordionList, function (accordion) {
							var container = Ractive.getNodeInfo(accordion).ractive;
							if (container && !container.get('open')) {
								container.set('open', true);
							}
						});
						_.delay(function () {
							window.location.href = window.location.href.replace(location.hash, '') + '#' + targetId;
						}.bind(this), 500);
					} else if (targetId) {
						window.location.href = window.location.href.replace(location.hash, '') + '#' + targetId;
					}
					if (self.get('isAnimated') && target && target.offset()) {
						$('html, body').animate({ scrollTop: target.offset().top}, 800);
					}
				} else if (self.get('type') === 'modal') {
					//event to start loading of defered widgets
					Ractive.defaults.fire('load_widget.load_widget');
					var jsonObj = self.get('pmodalData');
					var modalId = self.get('id');
					window.firedModalObj = {'modalId' : modalId, 'jsonObj' : jsonObj};
					Ractive.defaults.fire('openUXPModal', modalId, jsonObj);
				} else if (self.get('target') && self.get('href')) {
					//force redirection When target is given
					window.open(self.get('href'), self.get('target'));
				}
				var customEvent = this.get('ontap') || this.get('onclick');
				this.fireEvent(event, customEvent, this);
			}
		});
		//since component is getting executed multiple times , this event is also registearing that many times.
		//So first using off and then on so it will be listened only one time.
		// Ractive.defaults.off('bundleLoaded.widgetInitilized');
		// //event will be fired when defered widget bundle will be loaded and respective widget will be initilized.
		// Ractive.defaults.once('bundleLoaded.widgetInitilized', function () {
		// 	console.log('bundleLoaded_widgetInitilized--called');
		// 	//This will initiate UXF choicelist call which were defered along with widgets
		// 	Ractive.defaults.fire('load.choice.list');
		// 	//firing this event when all defered widgets are completly loaded and intilized.
		// 	Ractive.defaults.fire('openUXPModal', window.firedModalObj.modalId, window.firedModalObj.jsonObj, true);
		// });
		this.on('anchorMouseDwon', function (event) {
			var customEvent = this.get('onmousedown');
			if (customEvent) {
				this.fireEvent(event, customEvent, this);
			}
		});
		this.on('anchorMouseOver', function (event) {
			var customEvent = this.get('onMouseOver');
			if (customEvent) {
				this.fireEvent(event, customEvent, this);
			}
		});
	}
});

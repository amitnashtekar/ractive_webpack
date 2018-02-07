import Ractive from 'ractive';

import mock from './ux-header-mock.js';
import './ux-header.scss';
import template from './ux-header.html';
export default Ractive.extend({
	template,
	isolated: true,
	data: function () {
		return {
			level: 1
		};
	},
  	oninit() {

  	}
});

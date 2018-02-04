import Ractive from 'ractive';

import mock from './ux-store-details-mock.js';
import './ux-store-details.scss';
import template from './ux-store-details.html';
export default Ractive.extend({ // jshint ignore:line
  template,
  data() {
    return {
      message: 'This is the home page.',
      isToday: function (index) {
        var today  = moment(new Date()).day();
        return ((index + 1) === today) ? 'today' : '';
      }
    };
  },
  oninit() {
    
    this.set(mock.data);
    
  }
});

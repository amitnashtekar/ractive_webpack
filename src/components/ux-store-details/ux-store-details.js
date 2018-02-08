import Ractive from 'ractive';

import mock from './ux-store-details-mock.js';
import './ux-store-details.scss';
import template from './ux-store-details.html';
//import {uxHeader} from '../../components/index.js';
import uxHeader from '../ux-header/ux-header.js';
import uxAnchor from '../ux-anchor/ux-anchor.js';
export default Ractive.extend({
   components: {
        'ux-header':uxHeader,
        'ux-anchor':uxAnchor
    },
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

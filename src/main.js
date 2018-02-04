import Ractive from 'ractive';
import Router from 'ractive-route';
import {ux_store_details} from './components/index.js';

const router = new Router({
  el: '#main',
  basePath: '/'

});
router.addRoute('/', ux_store_details);



router.dispatch(window.location.pathname, { noHistory: true });
      

if (module.hot) {
  module.hot.accept();
}

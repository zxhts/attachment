import {
  registerRoutes,
  registerStores
} from 'mutants-microfx';
import './styles/index.less';
import routes from './pages';
import stores from './stores';
registerRoutes(routes);
registerStores(stores);
// import VConsole from 'vconsole/dist/vconsole.min.js';
// let vConsole = new VConsole();

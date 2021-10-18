/* eslint-disable import/extensions */
import eventBus from './scripts/eventBus.js';
import { init } from './viewDispatcher/callbacks.js';
import viewDispatcherListeners from './viewDispatcher/listeners.js';
import ajaxListeners from './ajax/listeners.js';
// import Router from './scripts/router.js';
import Router from './scripts/_router.js';

// import route from './scripts/_router.js';




eventBus.on('init', init);
eventBus.emit('init');
eventBus.add(viewDispatcherListeners);
eventBus.add(ajaxListeners);

const router = new Router();
router.set(document.getElementsByClassName('grid-container')[0]);
router
  .add('/', 'Homepage')
  .add('/homepage', 'Homepage')
  .add('/login', 'Signin')
  .add('/signup', 'Signup')
  .add('/profile', 'Profile')
  .add('/logout', 'Signout')
  .add('/product', 'Product');
router.start();

/* eslint-disable import/extensions */
import eventBus from './scripts/eventBus.js';
import { init } from './viewDispatcher/callbacks.js';
import viewDispatcherListeners from './viewDispatcher/listeners.js';
import ajaxListeners from './ajax/listeners.js';
// import Router from './scripts/router.js';
import router from './router/router.js';
import routerListeners from './router/listeners.js';

// import route from './scripts/_router.js';

eventBus.add(viewDispatcherListeners);
eventBus.add(ajaxListeners);
eventBus.on('init', init);
// eventBus.emit('init');

// (function () {
//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('sw.js', { scope: '/' })
//       .then((registration) => {
//         console.log('sw registration on scope:', registration.scope);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }
// }());


const root = document.getElementsByClassName('grid-container')[0];

// const router = new Router();
router.set(root);
eventBus.add(routerListeners);

router
  .register('/', 'homepage')
  .register('/homepage', 'homepage')
  .register('/login', 'signin')
  .register('/signup', 'signup')
  .register('/profile', 'profile')
  .register('/logout', 'signout')
  .register('/product', 'product')
  .register('/cart', 'cart');

router.start();

console.log(window.location.pathname);

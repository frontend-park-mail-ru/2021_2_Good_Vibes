/* eslint-disable import/extensions */
import cart from '../objects/cart.js';
import eventBus from '../scripts/eventBus.js';
import Aside from '../aside/view.js';

export const logoClick = () => {
  console.log('logo click');

  // eventBus.emit('homepage ajax request');

  //   eventBus.emit('showView', {
  //     name: 'Homepage'
  //   });
};

export const showAside = () => {
  eventBus.emit('show aside');
}

export const homepageStateRequest = () => {
  eventBus.emit('homepage state request');
};

export const profileStateRequest = () => {
  eventBus.emit('profile state request');

  // eventBus.emit('signin state request');
};

export const addHomepageToHistory = () => {
  eventBus.emit('history add', 'homepage');
};

export const showCart = () => {
  eventBus.emit('showView', {
    name: 'Cart'
  });
};

export const request = () => {
  eventBus.emit('profile ajax request');
};

export const addProfileToHistory = () => {
  eventBus.emit('history add', 'profile');
};

export const cartClick = () => {
  eventBus.emit('cart ajax request');
};

export const showLocalCart = () => {
  console.log(cart.getCartItems());
};

export const cartGetRequest = () => {
  eventBus.emit('cart get request');
};

// export const cartConfirmRequest = () => {
//   eventBus.emit('cart confirm request', cart.get());
// };

export const cartStateRequest = () => {
  eventBus.emit('cart state request');
};

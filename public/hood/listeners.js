/* eslint-disable import/extensions */
import * as hood from './callbacks.js';
import eventBus from '../scripts/eventBus.js';

const hoodListeners = [
  {
    event: 'aside button click',
    callback: [
      hood.showAside
    ]
  },
  {
    event: 'logo button click',
    callback: [
      hood.homepageStateRequest,
      // hood.addHomepageToHistory
    ]
  },
  {
    event: 'profile button click',
    callback: [
      hood.profileStateRequest,

      // hood.addProfileToHistory
    ]
  },

  {
    event: 'cart-click',
    callback: [
      hood.cartStateRequest,

      // () => {
      //   eventBus.emit('category get request');
      // }
    ]
  },
];

export default hoodListeners;

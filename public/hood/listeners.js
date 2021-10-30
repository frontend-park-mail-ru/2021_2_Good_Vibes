/* eslint-disable import/extensions */
import * as hood from './callbacks.js';
import eventBus from '../scripts/eventBus.js';

const hoodListeners = [
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
  // {
  //   event: 'authorization',
  //   callback: [
  //     () => {
  //       console.log('authorization');
  //     }
  //   ]
  // },
  // {
  //   event: 'no authorization',
  //   callback: [
  //     () => {
  //       console.log('no authorization');
  //     }
  //   ]
  // },
  {
    event: 'cart-click',
    callback: [
      // hood.showCart,

      // hood.cartGetRequest

      hood.cartStateRequest

      // () => {
      //   eventBus.emit('add product to cart request', 23);
      // }
    ]
  },
];

export default hoodListeners;

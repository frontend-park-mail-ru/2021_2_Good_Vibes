/* eslint-disable import/extensions */
import * as order from './callbacks.js';

const orderListeners = [
  {
    event: 'order continue click',
    callback: [
      order.saveAddress,
      order.showPayment,
    ]
  },
];

export default orderListeners;

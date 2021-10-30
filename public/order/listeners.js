/* eslint-disable import/extensions */
import * as order from './callbacks.js';

const orderListeners = [
  {
    event: 'continue click',
    callback: [
      order.showPayment,
    ]
  },
];

export default orderListeners;
/* eslint-disable import/extensions */
import * as payment from './callbacks.js';

const paymentListeners = [
  {
    event: 'continue click',
    callback: [
        payment.showDelivery,
    ]
  },
];

export default paymentListeners;
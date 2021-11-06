/* eslint-disable import/extensions */
import * as payment from './callbacks.js';

const paymentListeners = [
  {
    event: 'payment continue click',
    callback: [
      payment.showDelivery,
    ]
  },
];

export default paymentListeners;
/* eslint-disable import/extensions */
import * as delivery from './callbacks.js';

const deliveryListeners = [
  {
    event: 'delivery button click',
    callback: [
      delivery.deliveryBtnClick
    ]
  }
];

export default deliveryListeners;

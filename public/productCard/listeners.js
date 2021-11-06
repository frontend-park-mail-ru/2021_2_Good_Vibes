/* eslint-disable import/extensions */
import * as product from './callbacks.js';
// import eventBus from '../scripts/eventBus.js';

const productCardListeners = [
  {
    event: 'productName-href click',
    callback: [
      product.productStateRequest,
      // product.addProductToHistory
    ]
  },
  {
    event: 'productImg-href click',
    callback: [
      product.productStateRequest,
      // product.addProductToHistory
    ]
  }

];

export default productCardListeners;

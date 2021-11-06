/* eslint-disable import/extensions */
import * as cart from './callbacks.js';

const cartListeners = [
  {
    event: 'order click',
    callback: [
      cart.showOrder
    ]
  },
  {
    event: 'renderItemCart',
    callback: [
      cart.renderItemCart
    ]
  },
  {
    event: 'renderItemArray',
    callback: [
      cart.renderItemArray
    ]
  },
  {
    event: 'cartpageLoaded',
    callback: [
      cart.cartpageLoaded
    ]
  },
  {
    event: 'cart response',
    callback: [
      // cart.cartpageResponse

      cart.localCartResponse
    ]
  },
  {
    event: 'add product array to cart view',
    callback: [
      cart.addProductArray
    ]
  },

  {
    event: 'delete button click',
    callback: [
      // cart.deleteItem
    ]
  },

  {
    event: 'cart delete success',
    callback: [
      cart.deleteItem
    ]
  },

  {
    event: 'cart clean',
    callback: [
      cart.deleteAllItems
    ]
  }
];

export default cartListeners;
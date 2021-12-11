import { Connection } from '../../types';
import * as cart from './callbacks';

const connections: Connection[] = [
  {
    event: 'checkout button click',
    // callback: cart.addressStateRequest,
    callback: cart.confirmAjaxRequest,
  },
  {
    event: 'checkout mobile button click',
    // callback: cart.addressStateRequest,
    callback: cart.confirmMobileAjaxRequest,
  },
  {
    event: 'cart shown',
    callback: [
      cart.productArrayRequest,
      cart.showEmail,
      cart.calculateSubtotal,
    ],
  },
  {
    event: 'product array request confirmed',
    callback: [
      cart.showCartItems,
    ],
  },
  {
    event: 'delete product',
    callback: [
      cart.emptyCartViewControl,
      cart.deleteView,
      cart.calculateSubtotal,
    ],
  },
  {
    event: 'put product to cart',
    callback: cart.calculateSubtotal,
  },
];

export default connections;

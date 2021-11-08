import { Connection } from '../../types';
import * as cart from './callbacks';

const connections: Connection[] = [
  {
    event: 'cart get confirmed',
    callback: cart.load,
  },
  {
    event: 'signout confirmed',
    callback: cart.drop,
  },
  {
    event: 'add product to cart',
    callback: cart.addProductMiddleware,
  },
  {
    event: 'put product to cart confirmed',
    callback: cart.handlePutResponse,
  },
  {
    event: 'put product to cart',
    callback: cart.put,
  },
  {
    event: 'checkout button click',
    callback: cart.setConfirmed,
  },
  {
    event: 'delete product from cart',
    callback: cart.deleteProductMiddleware,
  },
  {
    event: 'delete product',
    callback: cart.deleteItem,
  },
  {
    event: 'delete product from cart confirmed',
    callback: cart.handleDeleteResponse,
  },
];

export default connections;
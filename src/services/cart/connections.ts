import { Connection } from '../../types';
import * as cart from './callbacks';

const connections: Connection[] = [
  {
    event: 'cart get confirmed',
    callback: cart.load,
  },
  {
    event: 'cart get confirmed promo',
    callback: cart.loadPromo,
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
    event: 'add product to cart mobile',
    callback: cart.addProductMiddleware,
  },
  {
    event: 'put product to cart request',
    callback: cart.putProductMiddleware,
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
  {
    event: 'order confirmed',
    callback: cart.drop,
  },
];

export default connections;

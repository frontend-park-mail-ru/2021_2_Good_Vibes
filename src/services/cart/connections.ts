import { Connection } from '../../types';
import * as cart from './callbacks';
import Cart from './cart';

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

  // -------------------------------
  // {
  //   event: 'add product to favorite local remote',
  //   callback: cart.authorizHandle,
  // },
  // {
  //   event: 'add favorite to local storage',
  //   callback: cart.addToFavoriteLocalStorage,
  // },
  // {
  //   event: 'product get confirmed',
  //   callback: cart.addToFavorite,
  // },

  {
    event: 'favorite product array parsed',
    callback: cart.addToFavoriteLocalStorage,
  },
  {
    event: 'add favorite ajax confirmed',
    callback: Cart.addToFavorite.bind(Cart),
  },
  {
    event: 'signout confirmed',
    callback: Cart.dropFavorite.bind(Cart),
  },
  {
    event: 'del favorite ajax confirmed',
    callback: Cart.deleteFromFavorite.bind(Cart),
  },
];

export default connections;

/* eslint-disable import/extensions */
import { Connection } from '../types';
import * as ajax from './callbacks';

const ajaxConnections: Connection[] = [
  {
    event: 'signin ajax request',
    callback: ajax.signin,
  },
  {
    event: 'signup ajax request',
    callback: ajax.signup,
  },
  {
    event: 'signout ajax request',
    callback: ajax.signout,
  },
  {
    event: 'profile ajax request',
    callback: ajax.profile,
  },
  {
    event: 'homepage ajax request',
    callback: ajax.homepage,
  },
  {
    event: 'product ajax request',
    callback: ajax.product,
  },
  // {
  //   event: 'cart ajax request',
  //   callback: ajax.cart
  // },
  {
    event: 'order ajax request',
    callback: ajax.order,
  },
  {
    event: 'cookie check request',
    callback: ajax.cookieCheck,
  },

  // ======================
  {
    event: 'put product to cart request',
    callback: ajax.putProductToCart,
  },
  {
    event: 'cart get request',
    callback: ajax.cartGet,
  },

  {
    event: 'cart confirm request',
    callback: ajax.cartConfirm,
  },
  {
    event: 'product array request',
    callback: ajax.productArrayRequest,
  },

  {
    event: 'product add request',
    callback: [
      ajax.productAdd,
    ],
  },

  {
    event: 'category get request',
    callback: [
      ajax.categoryGet,
    ],
  },

  {
    event: 'category ajax request',
    callback: [
      ajax.categoryRequest,
    ],
  },
  {
    event: 'delete product from cart request',
    callback: [
      ajax.cartDelete,
    ],
  },

  {
    event: 'profile upload request',
    callback: [
      ajax.profileUpload,
    ],
  },
  {
    event: 'avatar upload request',
    callback: [
      ajax.avatarUpload,
    ],
  },
  {
    event: 'orders list request',
    callback: ajax.orderList,
  },
  {
    event: 'comments ajax request',
    callback: ajax.comments,
  },
  {
    event: 'suggests ajax request',
    callback: ajax.suggests,
  },
  {
    event: 'search ajax request',
    callback: ajax.search,
  },
  {
    event: 'add comment request',
    callback: ajax.addComment,
  },
];

export default ajaxConnections;

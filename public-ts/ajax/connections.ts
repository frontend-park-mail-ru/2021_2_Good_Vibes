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
    event: 'add product to cart request',
    callback: ajax.addProductToCart,
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
    event: 'avatar upload request',
    callback: [
      ajax.avatarUpload,
    ],
  },

  {
    event: 'category get request',
    callback: [
      ajax.categoryGet,
    ],
  },

  {
    event: 'category request',
    callback: [
      ajax.categoryRequest,
    ],
  },
  {
    event: 'cart delete request',
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
];

export default ajaxConnections;

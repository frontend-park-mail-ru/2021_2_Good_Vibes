import searchParams from '../../object/search/params';
import { Connection } from '../../types';
import * as request from './callbacks';

const connections: Connection[] = [
  {
    event: 'signIn state request',
    callback: request.signIn,
  },
  {
    event: 'signUp state request',
    callback: request.signUp,
  },
  {
    event: 'profile state request',
    callback: request.profile,
  },
  {
    event: 'homepage state request',
    callback: request.homepage,
  },
  {
    event: 'product state request',
    callback: request.product,
  },
  {
    event: 'cart state request',
    callback: request.cartState,
  },
  {
    event: 'category state request',
    callback: [
      searchParams.setDefault,
      request.category,
    ],
  },
  {
    event: 'address state request',
    callback: request.address,
  },
  {
    event: 'payment state request',
    callback: request.payment,
  },
  {
    event: 'confirmation state request',
    callback: request.confirmation,
  },
  {
    event: 'saved state request',
    callback: request.savedState,
  },
  {
    event: 'orders state request',
    callback: request.orders,
  },
  {
    event: 'search state request',
    callback: [
      searchParams.setDefault,
      request.search,
    ],
  },
  {
    event: 'cart confirm request',
    callback: request.cartConfirm,
  },
];

export default connections;

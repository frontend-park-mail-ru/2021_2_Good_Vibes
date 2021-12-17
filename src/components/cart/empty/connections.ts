import { Connection } from '../../../types';
import * as emptyCart from './callbacks';

const connections: Connection[] = [
  {
    event: 'empty cart link click',
    callback: emptyCart.signInStateRequest,
  },
  // {
  //   event: 'emptyCart shown',
  //   callback: emptyCart.authorizeContentHandle,
  // },
];

export default connections;

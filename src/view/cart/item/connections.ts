import { Connection } from '../../../types';
import * as item from './callbacks';

const connections: Connection[] = [
  {
    event: 'delete button click',
    callback: item.deleteCartItem,
  },
  {
    event: 'product name href click',
    callback: item.productStateRequest,
  },
  // {
  //   event: 'put product to cart',
  //   callback: item.calculateSubtotal,
  // },
];

export default connections;

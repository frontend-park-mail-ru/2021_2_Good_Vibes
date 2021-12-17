import { Connection } from '../../types';
import * as list from './callbacks';

const connections: Connection[] = [
  {
    event: 'add product array to homepage',
    callback: list.addArray,
  },
  {
    event: 'product state confirmed',
    callback: list.add,
  },
];

export default connections;

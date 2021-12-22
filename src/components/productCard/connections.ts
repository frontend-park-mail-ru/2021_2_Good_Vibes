import { Connection } from '../../types';
import * as productCard from './callbacks';

const connections: Connection[] = [
  {
    event: 'card click',
    callback: productCard.productStateRequest,
  },
];

export default connections;
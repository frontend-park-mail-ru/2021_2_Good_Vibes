import { Connection } from '../types';
import * as router from './callbacks';

const connections: Connection[] = [
  {
    event: 'init check success',
    callback: router.init,
  },
];

export default connections;

import { Connection } from '../types';
import * as init from './callbacks';

const initConnections: Connection[] = [
  {
    event: 'cookie check finished',
    callback: init.cookieCheckFinished,
  },
  {
    event: 'cart get finished',
    callback: init.cartGetFinished,
  },
  {
    event: 'category get finished',
    callback: init.categoryGetFinished,
  },
];

export default initConnections;

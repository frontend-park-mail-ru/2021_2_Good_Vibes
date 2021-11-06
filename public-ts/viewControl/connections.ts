import { Connection } from '../types';
import * as dispatcher from './script';

const connections: Connection[] = [
  {
    event: 'show view',
    callback: dispatcher.showView,
  },
];

export default connections;

import { Connection } from '../types';
import * as dispatcher from './script';

const connections: Connection[] = [
  {
    event: 'show view',
    callback: dispatcher.showView,
  },
  // {
  //   event: 'profile button click',
  //   callback: [
  //     dispatcher.saveState,
  //     // hood.profileStateRequest,
  //   ],
  // },
];

export default connections;

import { Connection } from '../../types';
import * as user from './callbacks';

const connections: Connection[] = [
  {
    event: 'cookie check success',
    callback: user.set,
  },
  {
    event: 'signin success',
    callback: user.set,
  },
  {
    event: 'signup success',
    callback: user.set,
  },
  {
    event: 'signout confirmed',
    callback: user.del,
  },
  // {
  //   event: 'add user finished',
  //   callback: user.profileRequest,
  // },
];

export default connections;

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
];

export default connections;

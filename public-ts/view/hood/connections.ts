import { Connection } from '../../types';
import * as hood from './callbacks';

const connections: Connection[] = [
  {
    event: 'logo button click',
    callback: hood.homepageStateRequest,
  },
  {
    event: 'profile button click',
    callback: hood.profileStateRequest,
  },
  {
    event: 'cart button click',
    callback: hood.cartStateRequest,
  },
];

export default connections;

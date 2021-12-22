import { Connection } from '../../types';
import * as brandCard from './callbacks';

const connections: Connection[] = [
  {
    event: 'card brand click',
    callback: brandCard.brandStateRequest,
  },
];

export default connections;
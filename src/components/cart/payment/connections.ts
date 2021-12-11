import { Connection } from '../../../types';
import * as payment from './callbacks';

const connections: Connection[] = [
  {
    event: 'payment page continue button click',
    callback: [
      payment.getMethod,
      payment.confirmationStateRequest,
    ],
  },
];

export default connections;

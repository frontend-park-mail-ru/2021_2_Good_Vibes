import { Connection } from '../../types';
import * as aside from './callbacks';

const connections: Connection[] = [
  {
    event: 'hide aside',
    callback: aside.hide,
  },
  {
    event: 'show aside',
    callback: aside.show,
  },
  {
    event: 'category get confirmed',
    callback: [
      aside.parse,
      aside.hideHandle,
    ],
  },
];

export default connections;

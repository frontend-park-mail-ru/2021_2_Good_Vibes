import bus from '../../init/bus';
import { Connection, Product } from '../../types';
import * as homepage from './callbacks';

const connections: Connection[] = [
  {
    event: 'add product array to homepage',
    callback: [
      homepage.addProductArray,
      (array: Product[]): void => { bus.emit('get search filter params', array); },
    ],
  },
  {
    event: 'homepage hidden',
    callback: homepage.savePageYOffset,
  },
  {
    event: 'homepage shown',
    callback: homepage.scrollToPageYOffset,
  },
];

export default connections;

import bus from '../../modules/bus/bus';
import { Connection, Product } from '../../types';
import * as categoryPage from './callbacks';

const connections: Connection[] = [
  {
    event: 'scroll to bottom',
    callback: categoryPage.renderArray,
  },

  {
    event: 'add product array to category page',
    callback: [
      /* categoryPage.createChankGenerator, */
      categoryPage.renderArray,
      (array: Product[]): void => { bus.emit('get search filter params', array); },
    ],
  },
  {
    event: 'categoryPage hidden',
    callback: categoryPage.savePageYOffset,
  },
  {
    event: 'categoryPage shown',
    callback: [
      categoryPage.saveCurrentCategoryName,
      categoryPage.scrollToPageYOffset,
      // categoryPage.changeCategoryName,
      categoryPage.changeCategoryName,
    ],
  },
];

export default connections;

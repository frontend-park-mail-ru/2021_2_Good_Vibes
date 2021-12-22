import bus from '../../modules/bus/bus';
import { Connection, Product } from '../../types';
import * as searchPage from './callbacks';

const connections: Connection[] = [
  {
    event: 'scroll to bottom',
    callback: searchPage.renderArray,
  },

  {
    event: 'add product array to search page',
    callback: [
      /* searchPage.createChankGenerator, */
      searchPage.renderArray,
      (array: Product[]): void => { bus.emit('get search filter params', array); },
    ],
  },
  {
    event: 'searchPage hidden',
    callback: searchPage.savePageYOffset,
  },
  {
    event: 'searchPage shown',
    callback: [
      searchPage.saveCurrentCategoryName,
      searchPage.scrollToPageYOffset,
      // searchPage.changeCategoryName,
      searchPage.changeCategoryName,
    ],
  },
];

export default connections;

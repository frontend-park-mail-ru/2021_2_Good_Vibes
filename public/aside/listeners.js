/* eslint-disable import/extensions */
import * as aside from './callbacks.js';

const asideListeners = [
  {
    event: 'hide aside',
    callback: aside.hideAside,
  },
  {
    event: 'show aside',
    callback: aside.showAside,
  },

  {
    event: 'parse category obj',
    callback: [
      aside.parseCategoryObject
    ]
  },

  {
    event: 'show subcategory',
    callback: aside.showSubCategory
  }
];

export default asideListeners;
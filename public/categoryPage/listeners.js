/* eslint-disable import/extensions */
import * as model from './callbacks.js';

const categoryPageListeners = [
  {
    event: 'renderProdCard',
    callback: [
      model.renderProdCard
    ]
  },
  {
    event: 'render category prod array',
    callback: [
      model.renderProdArray
    ]
  },
  {
    event: 'categoryPageLoaded',
    callback: [
      model.homepageLoaded
    ]
  },
  {
    event: 'categoryPage response',
    callback: [
      model.homepageResponse
    ]
  }
];

export default categoryPageListeners;

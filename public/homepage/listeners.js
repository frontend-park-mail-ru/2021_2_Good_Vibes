/* eslint-disable import/extensions */
import * as model from './callbacks.js';

const homepageListeners = [
  {
    event: 'renderProdCard',
    callback: [
      model.renderProdCard
    ]
  },
  {
    event: 'renderProdArray',
    callback: [
      model.renderProdArray
    ]
  },
  {
    event: 'homepageLoaded',
    callback: [
      model.homepageLoaded
    ]
  },
  {
    event: 'homepage response',
    callback: [
      model.homepageResponse
    ]
  }
];

export default homepageListeners;

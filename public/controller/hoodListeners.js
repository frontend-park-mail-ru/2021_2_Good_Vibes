/* eslint-disable import/extensions */
import * as model from '../model/model.js';
import eventBus from './eventBus.js';

const hoodListeners = [
  {
    event: 'logo-click',
    callback: [
      model.logoClick
    ]
  },
  {
    event: 'profile-click',
    // callback: () => {
    //   eventBus.emit('hide-Hood');
    // }
    callback: [
      model.profileClick
    ]
  }
];

export default hoodListeners;
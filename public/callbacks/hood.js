/* eslint-disable import/extensions */
import eventBus from '../events/eventBus.js';

export const logoClick = () => {
  console.log('logo click');

  // eventBus.emit('homepage ajax request');

  eventBus.emit('showView', {
    name: 'Homepage'
  });


};

export const profileClick = () => {
  console.log('profile click');

  eventBus.emit('profile ajax request');
};

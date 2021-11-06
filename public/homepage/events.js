/* eslint-disable import/extensions */
import eventBus from '../scripts/eventBus.js';

const homepageEvents = (element) => {
  eventBus.emit('homepage ajax request');
};

export default homepageEvents;

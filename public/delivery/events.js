/* eslint-disable import/extensions */
import eventBus from '../scripts/eventBus.js';

const deliveryEvents = (element) => {
  const deliveryBtn = element.getElementsByClassName('primary fw')[0];
  deliveryBtn.addEventListener('click', (event) => {
    event.preventDefault();

    eventBus.emit('delivery button click');
  });
};

export default deliveryEvents;

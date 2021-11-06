/* eslint-disable import/extensions */
import eventBus from '../scripts/eventBus.js';

const orderEvents = (element) => {
  const continueBtn = element.getElementsByClassName('primary fw')[0];

  continueBtn.addEventListener('click', (event) => {
    event.preventDefault();
    eventBus.emit('order continue click');
  });
};
export default orderEvents;
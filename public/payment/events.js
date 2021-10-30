/* eslint-disable import/extensions */
import eventBus from '../scripts/eventBus.js';

const paymentEvents = (element) => {
  const continueBtn = element.getElementsByClassName('primary')[0];

  continueBtn.addEventListener('click', (event) => {
    event.preventDefault();
    eventBus.emit('continue click');
  });
};
export default paymentEvents;
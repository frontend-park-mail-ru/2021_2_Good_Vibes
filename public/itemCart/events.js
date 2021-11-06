/* eslint-disable import/extensions */
import eventBus from '../scripts/eventBus.js';

const ItemCartEvents = ({ element, context }) => {
  const deleteBtn = element.getElementsByClassName(`delete-button-${context.id}`)[0];

  deleteBtn.addEventListener('click', (event) => {
    event.preventDefault();

    eventBus.emit('delete button click', context.id);
  });
};

export default ItemCartEvents;

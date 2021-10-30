import eventBus from '../scripts/eventBus.js';

export const showDelivery = () => {
  eventBus.emit('showView', {
    name: 'Delivery'
  });
};
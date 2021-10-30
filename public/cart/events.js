/* eslint-disable import/extensions */
import eventBus from '../scripts/eventBus.js';

const cartpageEvents = (element) => {
  const orderBtn = element.getElementsByClassName('primary fw')[0];

  orderBtn.addEventListener('click', (event) => {
    event.preventDefault();
    eventBus.emit('order click');
  });

/*   const cartpageBtn = element.getElementsByClassName('cart-href')[0];
  
  cartpageBtn.addEventListener('click', (event) => {
    event.preventDefault();
    eventBus.emit('cart ajax request');
  }); */
};

export default cartpageEvents;

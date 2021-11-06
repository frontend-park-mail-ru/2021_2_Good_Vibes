/* eslint-disable import/extensions */
import eventBus from '../scripts/eventBus.js';

const productEvents = (element) => {
  console.log('productEvents');

  // -------------------------------
  const backToResultBtn = element.getElementsByClassName('back-to-result')[0];

  backToResultBtn.addEventListener('click', (event) => {
    event.preventDefault();

    eventBus.emit('backToResult click');
  });

  //-------------------------------------
  const cartBtn = element.getElementsByClassName('fw add-button primary')[0];

  cartBtn.addEventListener('click', (event) => {
    event.preventDefault();
    // eventBus.emit('cart click');
    // console.log(element.parentNode.getContext);
    eventBus.emit('cart click');
  });

};

export default productEvents;

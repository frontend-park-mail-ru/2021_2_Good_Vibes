/* eslint-disable import/extensions */
import eventBus from '../scripts/eventBus.js';

const productCardEvents = ({ element, context }) => {
  // console.log('productCardEvents');

  // ----------------------------
  const productNameBtn = element.getElementsByClassName('productName-href')[0];
  productNameBtn.addEventListener('click', (event) => {
    event.preventDefault();

    eventBus.emit('productName-href click', context.id);
  });

  // ----------------------------
  const productImgBtn = element.getElementsByClassName('productImg-href')[0];

  productImgBtn.addEventListener('click', (event) => {
    event.preventDefault();

    eventBus.emit('productImg-href click', context.id);
  });
};

export default productCardEvents;

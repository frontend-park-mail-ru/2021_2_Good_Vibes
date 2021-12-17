import bus from '../../modules/bus/bus';
import { Product } from '../../types';

const initEvents: (self: HTMLElement, context: Product) => void = (self, context) => {
  // ------------------
  const backBtn = <HTMLAnchorElement>self.getElementsByClassName('back-to-result__link')[0];
  backBtn.addEventListener('click', (event) => {
    event.preventDefault();

    bus.emit('back to result button click', undefined);
  });

  // ------------------
  const addBtn = <HTMLButtonElement>self.getElementsByClassName('info-card-btn__cart')[0];
  addBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const { id } = context;

    bus.emit('add product to cart', { id, number: 1 });
  });

  const addBtnMobile = <HTMLButtonElement>self.getElementsByClassName('info-card-mobile-btn__cart')[0];
  addBtnMobile.addEventListener('click', (event) => {
    event.preventDefault();

    const { id } = context;

    bus.emit('add product to cart mobile', { id, number: 1 });
  });
};

export default initEvents;

import bus from '../../init/bus';
import { Product } from '../../types';

const initEvents: (self: HTMLElement, context: Product) => void = (self, context) => {
  // ------------------
  const backBtn = <HTMLAnchorElement>self.getElementsByClassName('back-to-result')[0];
  backBtn.addEventListener('click', (event) => {
    event.preventDefault();

    bus.emit('back to result button click', undefined);
  });

  // ------------------
  const addBtn = <HTMLButtonElement>self.getElementsByClassName('btn')[0];
  addBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const { id } = context;

    bus.emit('add product to cart', { id, number: 1 });
  });
};

export default initEvents;

import bus from '../../init/bus';
import { Product } from '../../types';

const initEvents: (self: HTMLElement, context: Product) => void = (self, context) => {
  const { id } = context;

  // ------------------
  const productImgHref = <HTMLElement>self.getElementsByClassName('product-card')[0];
  productImgHref.addEventListener('click', (event) => {
    event.preventDefault();

    bus.emit('card click', { id });
  });
};

export default initEvents;

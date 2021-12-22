import bus from '../../modules/bus/bus';
import { Brand } from '../../types';

const initEvents: (self: HTMLElement, context: Brand) => void = (self, context) => {
  const { name, id } = context;

  // ------------------
  const productImgHref = <HTMLElement>self.getElementsByClassName('brand-card')[0];
  productImgHref.addEventListener('click', (event) => {
    event.preventDefault();

    bus.emit('card brand click', { name, id });
  });
};

export default initEvents;

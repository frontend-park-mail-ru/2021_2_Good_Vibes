import bus from '../../../modules/bus/bus';
import cart from '../../../services/cart/cart';
import { Product } from '../../../types';

const initEvents: (self: HTMLElement, context: Product) => void = (self, context) => {
  // ----------------
  const deleteBtn = <HTMLButtonElement>self.getElementsByClassName('basket__table_remove')[0];
  deleteBtn.addEventListener('click', (event) => {
    event.preventDefault();

    bus.emit('delete button click', context);
  });

  // --------------
  const nameHref = <HTMLAnchorElement>self.getElementsByClassName('basket__table_position-link')[0];

  nameHref.addEventListener('click', (event) => {
    event.preventDefault();

    bus.emit('product name href click', context);
  });

  // ----------------
  const numberInput = <HTMLInputElement>self.getElementsByClassName('spinner__count')[0];
  numberInput.addEventListener('change', (event) => {
    event.preventDefault();

    let value = +numberInput.value;
    if (value < 0) {
      value = 0;
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { count_in_stock } = context;
    if (value > count_in_stock) {
      value = context.count_in_stock;
    }
    value = Math.floor(value);
    if (value === 0) {
      bus.emit('delete button click', context);
      self.remove();
      return;
    }

    numberInput.value = value.toString();

    bus.emit('put product to cart request', { id: context.id, number: value });

    bus.emit('cart check request', { products: cart.get(), promocode: cart.getPromo });
  });

  /*   const numberInputMobile = <HTMLInputElement>self.getElementsByClassName('spinner__count-mobile')[0];
    numberInputMobile.addEventListener('change', (event) => {
      event.preventDefault();
  
      let value = +numberInputMobile.value;
      if (value < 0) {
        value = 0;
      }
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { count_in_stock } = context;
      if (value > count_in_stock) {
        value = context.count_in_stock;
      }
      value = Math.floor(value);
      if (value === 0) {
        bus.emit('delete button click', context);
        self.remove();
        return;
      }
  
      numberInputMobile.value = value.toString();
  
      bus.emit('put product to cart request', { id: context.id, number: value });
    }); */
};

export default initEvents;

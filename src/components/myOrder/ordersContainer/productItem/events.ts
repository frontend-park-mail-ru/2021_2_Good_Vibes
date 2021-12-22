import bus from "../../../../modules/bus/bus";
import { Product } from "../../../../types";

const initEvents: (self: HTMLElement, context: Product) => void = (self, context) => {
  const href = self.getElementsByClassName('product-item__href')[0];

  href.addEventListener('click', (event) => {
    event.preventDefault();

    // debugger;

    bus.emit('item click', { id: context.product_id });
  })
};

export default initEvents;

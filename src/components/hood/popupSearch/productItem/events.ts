import bus from '../../../../init/bus';
import { ProductSuggest } from '../../../../types';

const initEvents: (self: HTMLElement, context: ProductSuggest) => void = (self, context) => {
  const { id } = context;

  // ---------------------
  self.addEventListener('click', (event) => {
    event.preventDefault();

    bus.emit('product state request', { id });
  });
};

export default initEvents;

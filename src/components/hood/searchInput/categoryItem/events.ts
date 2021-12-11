import bus from '../../../../modules/bus/bus';
import { CategorySuggest } from '../../../../types';

const initEvents: (self: HTMLElement, context: CategorySuggest) => void = (self, context) => {
  const { name } = context;

  // ------------------
  self.addEventListener('click', (event) => {
    event.preventDefault();

    bus.emit('category state request', { name });
  });
};

export default initEvents;

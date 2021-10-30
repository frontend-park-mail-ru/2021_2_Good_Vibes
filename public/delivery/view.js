/* /* eslint-disable import/extensions */
import View from '../scripts/view.js';
/* import deliveryListeners from './listeners.js';
import deliveryEvents from './events.js'; */
import compiledTemplate from './template.handlebars';
/* import eventBus from '../scripts/eventBus.js'; */

export default class Delivery extends View {
  element;

  #context;

  /* #generateEvents = deliveryEvents; */

  constructor(element) {
    super(element);
    this.element = element;
  }

  async #renderHTML() {
    const html = compiledTemplate(this.#context);
    this.element.innerHTML = html;
  }

  async render() {
    await this.#renderHTML();
   /*  eventBus.add(deliveryListeners);
    this.#generateEvents(this.element); */
    return this.show();
  }

  delete() {
    this.element.innerHTML = '';
  }
}
/* eslint-disable import/extensions */
import View from '../scripts/view.js';
import hoodEvents from './events.js';
import hoodListeners from './listeners.js';
import bus from '../scripts/eventBus.js';
import compiledTemplate from './template.handlebars';

export default class Hood extends View {
  #context;

  element;

  #generateEvents = hoodEvents;

  constructor(element) {
    super(element);
    this.element = element;
  }

  async #renderHTML() {
    const html = compiledTemplate(this.#context);
    this.element.innerHTML = html;
    // this.element.setAttribute('name', this.#context.id);
  }

  setContext(context) {
    this.#context = context;
  }

  async render() {
    await this.#renderHTML();
    bus.add(hoodListeners);
    this.#generateEvents(this.element);
    return this.show();
    // .catch((error) => alert(error));
  }

  delete() {
    bus.delete(hoodListeners);
    this.element.innerHTML = '';
  }

  hide() {
    this.element.style.visibility = 'hidden';
    this.element.hidden = true;
  }

  show() {
    this.element.style.visibility = 'visible';
    this.element.hidden = false;
  }
}

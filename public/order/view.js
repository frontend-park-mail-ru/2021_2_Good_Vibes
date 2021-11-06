/* eslint-disable import/extensions */
import View from '../scripts/view.js';
import generateContentHTML from '../scripts/loadTemplates.js';
import orderListeners from './listeners.js';
import orderEvents from './events.js';
import compiledTemplate from './template.handlebars';
import eventBus from '../scripts/eventBus.js';

export default class Order extends View {
  element;

  #context;

  #generateEvents = orderEvents;

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
    eventBus.add(orderListeners);
    this.#generateEvents(this.element);
    return this.show();
  }

  delete() {
    this.element.innerHTML = '';
  }
}
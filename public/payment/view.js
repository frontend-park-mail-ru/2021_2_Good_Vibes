/* eslint-disable import/extensions */
import View from '../scripts/view.js';
import eventBus from '../scripts/eventBus.js';
import paymentEvents from './events.js';
import paymentListeners from './listeners.js';
import compiledTemplate from './template.handlebars';

export default class Payment extends View {
  element;

  #context;

  #generateEvents = paymentEvents;

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
    eventBus.add(paymentListeners);
    this.#generateEvents(this.element);
    return this.show();
  }

  delete() {
    // eventBus.delete(signinListeners);
    this.element.innerHTML = '';
  }
}
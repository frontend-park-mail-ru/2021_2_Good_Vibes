/* eslint-disable import/extensions */

import eventBus from '../scripts/eventBus.js';
import itemCartEvents from './events.js';
import itemCartListeners from './listeners.js';
import View from '../scripts/view.js';
import compiledTemplate from './template.handlebars';

export default class ItemCart extends View {
  element;

  #context;

  #generateEvents = itemCartEvents;

  constructor(element) {
    super(element);
    this.element = element;
  }

  setContext(context) {
    this.#context = context;
  }

  async #renderHTML() {
    const html = compiledTemplate(this.#context);
    this.element.innerHTML = html;
    /* this.element.setAttribute('name', this.#context.id); */
  }

  #createQtyHTML() {
    const qtyParent = this.element.getElementsByClassName('qty-select')[0];
    const qtyElem = document.createElement('select');
    qtyElem.className = 'qty-select';
    qtyElem.id = this.#context.id;

    const temp = (count_in_stock, number) => {
      return `
    ${[...Array(count_in_stock).keys()].map((x) =>
        number === x + 1
          ? `<option value ="${x + 1} selected">${x + 1}</option>`
          : `<option value="${x + 1}">${x + 1}</option>`
      )};
         `;
    }
    qtyElem.innerHTML = temp(this.#context.count_in_stock, this.#context.number);
    qtyParent.replaceWith(qtyElem);
  }

  async render() {
    await this.#renderHTML();
    eventBus.add(itemCartListeners);
    this.#generateEvents({
      element: this.element,
      context: this.#context
    });
    this.#createQtyHTML();
    return this.show();
  }

  delete() {
    // eventBus.delete(signinListeners);
    this.element.innerHTML = '';
  }
}
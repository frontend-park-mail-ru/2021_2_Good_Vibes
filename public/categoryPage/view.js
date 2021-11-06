/* eslint-disable import/extensions */

import eventBus from '../scripts/eventBus.js';
import View from '../scripts/view.js';
import categoryPageEvents from './events.js';
import categoryPageListeners from './listeners.js';
import compiledTemplate from './template.handlebars';

export default class CategoryPage extends View {
  element;

  #context;

  #generateEvents = categoryPageEvents;

  constructor(element) {
    super(element);
    this.element = element;
  }

  async #renderHTML() {
    const html = compiledTemplate(this.#context);
    this.element.innerHTML = html;
    // this.element.setAttribute('category-name', this.#context.category);
    // console.log(this.#context);
  }

  async render() {
    await this.#renderHTML();
    eventBus.add(categoryPageListeners);
    this.#generateEvents(this.element);
    return this.show();
  }

  delete() {
    // eventBus.delete(signinListeners);
    this.element.innerHTML = '';
  }

  setContext(context) {
    this.#context = context;
  }
}
/* eslint-disable import/extensions */

import eventBus from '../scripts/eventBus.js';
import View from '../scripts/view.js';
import homepageEvents from './events.js';
import homepageListeners from './listeners.js';
import compiledTemplate from './template.handlebars';

export default class Homepage extends View {
  element;

  #context;

  #generateEvents = homepageEvents;

  constructor(element) {
    super(element);
    this.element = element;
  }

  async #renderHTML() {
    const html = compiledTemplate(this.#context);
    this.element.innerHTML = html;
    // this.element.setAttribute('name', this.#context.id);
  }

  async render() {
    await this.#renderHTML();
    eventBus.add(homepageListeners);
    this.#generateEvents(this.element);
    return this.show();
  }

  delete() {
    // eventBus.delete(signinListeners);
    this.element.innerHTML = '';
  }
}
/* eslint-disable import/extensions */
import signupEvents from './events.js';
import View from '../scripts/view.js';
import signupListeners from './listeners.js';
import eventBus from '../scripts/eventBus.js';
import compiledTemplate from './template.handlebars';

export default class Signup extends View {
  element;

  #context;

  #generateEvents = signupEvents;

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
    eventBus.add(signupListeners);
    this.#generateEvents(this.element);
    return this.show();
  }

  delete() {
    // eventBus.delete(signinListeners);
    this.element.innerHTML = '';
  }
}

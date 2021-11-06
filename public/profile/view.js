/* eslint-disable import/extensions */
import View from '../scripts/view.js';
import profileEvents from './events.js';
import eventBus from '../scripts/eventBus.js';
import profileListeners from './listeners.js';
import compiledTemplate from './template.handlebars';

export default class Profile extends View {
  element;

  #context;

  #generateEvents = profileEvents;

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
    eventBus.add(profileListeners);
    this.#generateEvents(this.element);

    // console.log('render profile', user);

    return this.show();
  }

  delete() {
    // eventBus.delete(signinListeners);
    this.element.innerHTML = '';
  }
}

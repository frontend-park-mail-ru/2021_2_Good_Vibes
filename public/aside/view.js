/* /* eslint-disable import/extensions */
import View from '../scripts/view.js';
import asideListeners from './listeners.js';
import asideEvents from './events.js';
import compiledTemplate from './template.handlebars';
import eventBus from '../scripts/eventBus.js';

export default class Aside extends View {
  element;

  #context;

  #generateEvents = asideEvents;

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
    eventBus.add(asideListeners);
    this.#generateEvents(this.element);
    return this.show();
  }

  delete() {
    this.element.innerHTML = '';
  }
}
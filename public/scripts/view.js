/* eslint-disable import/extensions */

export default class View {
  element;

  #className = this.constructor.name;

  get() {
    return this.element;
  }

  constructor(element) {
    this.element = element;

    // this.element.dataset.view = this.#className;
    // this.element.hidden = true;
  }

  isActive() {
    if (this.element.style.visibility === 'visible') {
      return true;
    }
    if (this.element.style.visibility === 'hidden') {
      return false;
    }
    return undefined;
  }

  hide() {
    // this.element.style.visibility = 'hidden';
    // this.element.hidden = true;

    this.element.children[0].style.visibility = 'hidden';
    this.element.children[0].hidden = true;
  }

  show() {
    // this.element.style.visibility = 'visible';
    // this.element.hidden = false;

    this.element.children[0].style.visibility = 'visible';
    this.element.children[0].hidden = false;
  }

  delete() {
    this.element.innerHTML = '';
  }
}

/* eslint-disable import/extensions */
import View from '../scripts/view.js';
import cartpageEvents from './events.js';
import eventBus from '../scripts/eventBus.js';
import cartListeners from './listeners.js';
import compiledTemplate from './template.handlebars';
import cart from '../objects/cart.js'

export default class Cart extends View {
  element;

  #context;

  #generateEvents = cartpageEvents;

  constructor(element) {
    super(element);
    this.element = element;
  }

  async #renderHTML() {
    const html = compiledTemplate(this.#context);
    this.element.innerHTML = html;
    // this.element.setAttribute('name', this.#context.id);
  }

  #createItemsHTML() {
    const itemParent = this.element.getElementsByClassName('items')[0];
    const itemElem = document.createElement('div');
    itemElem.className = 'items';

    const cartItems = cart.getCartItems();

    if (cartItems.length === 0) {
      itemElem.innerHTML = '<div>Cart is empty. <a href="/#/">Go Shopping</a>'
    } 
    itemParent.appendChild(itemElem);
  }

  #createSubtotalHTML() {
    const subParent = this.element.getElementsByClassName('subtotal')[0];
    const subElem = document.createElement('div');
    subElem.className = 'subtotal';

    const cartItems = cart.getCartItems();

    subElem.innerHTML = `
    <h3>
            Итого (${cartItems.reduce((a, c) => a + c.count_in_stock, 0)} товаров)
            :
            $${cartItems.reduce((a, c) => a + c.price * c.count_in_stock, 0)}
          </h3>
          `;
    subParent.appendChild(subElem);
  }


  async render() {
    await this.#renderHTML();
    eventBus.add(cartListeners);
    this.#generateEvents(this.element);
    this.#createItemsHTML();
    //this.#createSubtotalHTML();
    //console.log(cartItems);
    return this.show();
  }

  delete() {
    // eventBus.delete(signinListeners);
    this.element.innerHTML = '';
  }
}
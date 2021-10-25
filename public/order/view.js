/* eslint-disable import/extensions */
import View from '../scripts/view.js';
import generateContentHTML from '../scripts/loadTemplates.js';

const orderUrl = './order/template.handlebars';

export default class Order extends View {
  #url = orderUrl;

  element;

  #context;

  //#generateEvents = orderEvents;

  constructor(element) {
    super(element);
    this.element = element;
  }

  async #renderHTML() {
    const html = await generateContentHTML({
      url: this.#url,
      context: this.#context
    });
    this.element.innerHTML = html;
  }

  #createStepsHTML() {
    const stepsParent = this.element.getElementsByClassName('steps')[0];
    const stepsElem = document.createElement('div');
    stepsElem.className = 'steps';

    const temp = (step) => {
      return `
      <div class="steps">
      <div class="${step ? 'active' : ''}">Signin</div>
      <div class="${step ? 'active' : ''}">Shipping</div>
      <div class="${step ? 'active' : ''}">Payment</div>
      <div class="${step ? 'active' : ''}">Place Order</div>
    </div>
        `;
    };

    stepsElem.innerHTML = temp(this.#context.step);
    stepsParent.replaceWith(stepsElem);
  }

  async render() {
    await this.#renderHTML();
    //eventBus.add(orderListeners);
    //this.#generateEvents(this.element);
    this.#createStepsHTML();
    return this.show();
  }

  delete() {
    // eventBus.delete(signinListeners);
    this.element.innerHTML = '';
  }
}
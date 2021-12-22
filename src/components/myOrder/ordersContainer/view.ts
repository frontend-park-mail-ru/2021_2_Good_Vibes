import * as compiledTemplate from './template.handlebars';
import bus from '../../../modules/bus/bus';
import initEvents from './events';
/* import connections from './connections'; */
import { myOrder, Product } from '../../../types';
import './ordersContainer.scss';
import ProductItem from './productItem/view';

export default class OrdersContainer {
  public self: HTMLElement;

  public context: myOrder;

  private async renderHTML() {
    /*  const html = compiledTemplate({ ...this.context.address, ...this.context.products }); */
    const html = compiledTemplate(this.context);
    this.self.innerHTML = html;
    initEvents(this.self);

    const target = this.self.getElementsByClassName('order-item__list')[0];

    // console.log(target);

    this.context.products.forEach(product => {
      const productItem = new ProductItem(product);

      // console.log();
      target.appendChild(productItem.self);

      // debugger;

    });
  }

  public async render(): Promise<void> {
    await this.renderHTML();
    return this.show();
  }

  constructor(context: myOrder) {
    this.setContext(context);
    this.self = <HTMLElement>document.createElement('ul');
    this.self.className = 'orders-container-ul';
    /* bus.add(connections); */
    this.render();
  }

  public setContext(context: myOrder): void {
    this.context = context;
  }

  public hide(): void {
    this.self.style.visibility = 'hidden';
    this.self.hidden = true;
  }

  public show(): void {
    this.self.style.visibility = 'visible';
    this.self.hidden = false;
  }
}

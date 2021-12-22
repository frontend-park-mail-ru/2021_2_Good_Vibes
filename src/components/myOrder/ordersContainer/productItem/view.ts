import * as compiledTemplate from './template.handlebars';
import bus from '../../../../modules/bus/bus';
import { Product } from '../../../../types';
import initEvents from './events';
import connections from './connections';
// import { myOrder } from '../../../types';
import './productItem.scss';

export default class ProductItem {
  public self: HTMLElement;

  public context: Product

  private async renderHTML() {
    /*  const html = compiledTemplate({ ...this.context.address, ...this.context.products }); */
    const html = compiledTemplate(this.context);
    this.self.innerHTML = html;
    // debugger;

    initEvents(this.self, this.context);
  }

  public async render(): Promise<void> {
    await this.renderHTML();
    return this.show();
  }

  constructor(context: Product) {
    this.setContext(context);
    this.self = <HTMLElement>document.createElement('li');
    this.self.className = 'order-item__product';
    bus.add(connections);
    this.render();
  }

  public setContext(context: Product): void {
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

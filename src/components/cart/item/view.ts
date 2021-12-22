import * as compiledTemplate from './template.handlebars';
import View from '../../../modules/vibeView/view';
import { Product, ViewInterface } from '../../../types';
import bus from '../../../modules/bus/bus';
import connections from './connections';
import initEvents from './events';
import './item.scss';

export default class CartItem extends View implements ViewInterface {
  private async renderHTML() {
    // const html = compiledTemplate(this.context);

    const img = <string[]>this.context.image;
    const html = compiledTemplate({ ...this.context, ...img });

    this.self.innerHTML = html;
    initEvents(this.self, this.context);
  }

  public async render(): Promise<void> {
    await this.renderHTML();
    return this.show();
  }

  constructor(context: Product) {
    super();
    this.setContext(context);
    this.self = <HTMLElement>document.createElement('div');
    this.self.className = `basket__table_row table-product-${context.id}`
    bus.add(connections);
    this.render();
  }
}

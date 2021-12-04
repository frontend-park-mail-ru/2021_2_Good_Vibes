import * as compiledTemplate from './template.handlebars';
import View from '../view';
import { Product, ViewInterface } from '../../types';
import bus from '../../init/bus';
import connections from './connections';
import initEvents from './events';
import './productCard.scss';

export default class ProductCard extends View implements ViewInterface {
  private async renderHTML() {
    const html = compiledTemplate(this.context);
    this.self.innerHTML = html;
    initEvents(this.self, this.context);
  }

  public async render(): Promise<void> {
    await this.renderHTML();
    return this.show();
  }

  constructor(className: string, context: Product) {
    super();
    this.setContext(context);
    this.self = <HTMLElement>document.createElement('div');
    bus.add(connections);
    this.render();
  }
}
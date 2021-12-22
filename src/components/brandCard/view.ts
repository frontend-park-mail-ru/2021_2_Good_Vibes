import * as compiledTemplate from './template.handlebars';
import View from '../../modules/vibeView/view';
import { Brand, Product, ViewInterface } from '../../types';
import bus from '../../modules/bus/bus';
import connections from './connections';
import initEvents from './events';
import './brandCard.scss';

export default class BrandCard extends View {
  public contextBrand: Brand;

  private async renderHTML() {
    const html = compiledTemplate(this.contextBrand);
    this.self.innerHTML = html;
    initEvents(this.self, this.contextBrand);
  }

  public async render(): Promise<void> {
    await this.renderHTML();
    return this.show();
  }

  constructor(className: string, context: Brand) {
    super();
    this.contextBrand = context
    this.self = <HTMLElement>document.createElement('div');
    bus.add(connections);
    this.render();
  }

  public setContext(context: Brand): void {
    this.contextBrand = context;
  }
}
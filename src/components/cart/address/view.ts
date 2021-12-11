import * as compiledTemplate from './template.handlebars';
import View from '../../view';
import { ViewInterface } from '../../../types';
import bus from '../../../init/bus';
import connections from './connections';
import initEvents from './events';
import './address.scss';

export default class AddressPage extends View implements ViewInterface {
  private async renderHTML() {
    const html = compiledTemplate(this.context);
    this.self.innerHTML = html;
    initEvents(this.self);
  }

  public async render(): Promise<void> {
    await this.renderHTML();
    return this.show();
  }

  constructor() {
    super();
    this.self = <HTMLElement>document.createElement('class');
    this.self.id = 'layout';
    bus.add(connections);
    this.render();
  }
}

import * as compiledTemplate from './template.handlebars';
import View from '../view';
import { ViewInterface } from '../../types';
import bus from '../../init/bus';
import initEvents from './events';
import connections from './connections';
import './productPage.scss';

import newCommentContainer from './newCommentContainer/view';

export default class ProductPage extends View implements ViewInterface {
  private async renderHTML() {
    const html = compiledTemplate(this.context);
    this.self.innerHTML = html;
    initEvents(this.self, this.context);
  }

  public async render(): Promise<void> {
    await this.renderHTML();

    // -----------------------
    this.self.getElementsByClassName('board-bottom')[0].appendChild(newCommentContainer.self);
    // ----------------------

    return this.show();
  }

  constructor(classId: string) {
    super();
    this.self = <HTMLElement>document.createElement('class');
    this.self.className = 'layout layout__main';
    this.self.id = 'layout';
    bus.add(connections);
    this.render();
  }
}

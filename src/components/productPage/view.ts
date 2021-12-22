import * as compiledTemplate from './template.handlebars';
import View from '../../modules/vibeView/view';
import { Callback, ViewInterface } from '../../types';
import bus from '../../modules/bus/bus';
import initEvents from './events';
import connections from './connections';
import './productPage.scss';

import newCommentContainer from './newCommentContainer/view';
import MiniImgContainer from './miniImgContainer/view';

export default class ProductPage extends View implements ViewInterface {

  private img: string[] = [];

  private async renderHTML() {

    // debugger;

    const img = <string[]>this?.context?.image;
    const context = this?.context;

    const html = compiledTemplate({ ...context, ...img });
    this.self.innerHTML = html;

    // debugger;

    const targetForMinis = this.self.getElementsByClassName('mini-img-container')[0];
    const minisMap: { [id: number]: MiniImgContainer } = {};
    img?.forEach((src, index) => {
      minisMap[index] = new MiniImgContainer(src, index);
      targetForMinis.append(minisMap[index].self);
    })


    // bus.emit('mini img selected', { id: this.id, src: this.src });

    const callback: Callback = ({ id }: { id: number }) => {
      Object.values(minisMap).forEach(minisElem => {
        if (minisElem.id !== id) {
          minisElem.setUnselected();
        }
      })
    }

    bus.on('mini img selected', callback);

    initEvents(this.self, { context, img });
  }

  public async render(): Promise<void> {
    await this.renderHTML();

    // -----------------------
    this.self.getElementsByClassName('layout-inner')[0].appendChild(newCommentContainer?.self);
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

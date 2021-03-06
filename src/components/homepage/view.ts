import * as compiledTemplate from './template.handlebars';
import View from '../../modules/vibeView/view';
import { ViewInterface } from '../../types';
import bus from '../../modules/bus/bus';
import connections from './connections';
// import * as styles from './homepage.scss';
import './homepage.scss';
import SearchFiltersContainer from '../searchFiltersContainer/view';

export default class Homepage extends View implements ViewInterface {
  private async renderHTML() {
    const html = compiledTemplate(this.context);
    this.self.innerHTML = html;
  }

  public async render(): Promise<void> {
    await this.renderHTML();

    // // ---------------------------
    // const searchFiltersContainer = new SearchFiltersContainer(undefined);
    // this.self.getElementsByClassName('layout-inner')[0].prepend(searchFiltersContainer.self);
    // // ---------------------------

    return this.show();
  }

  constructor(classId: string) {
    super();
    this.self = <HTMLElement>document.createElement('div');
    this.self.id = 'layout';
    this.self.className = 'layout';
    bus.add(connections);
    this.render();
  }
}

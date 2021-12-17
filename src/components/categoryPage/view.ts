import * as compiledTemplate from './template.handlebars';
import View from '../../modules/vibeView/view';
import { ViewInterface } from '../../types';
import bus from '../../modules/bus/bus';
import initEvents from './events';
import connections from './connections';
import SearchFiltersContainer from '../searchFiltersContainer/view';
import './categoryPage.scss';

export default class CategoryPage extends View implements ViewInterface {
  private async renderHTML() {
    const html = compiledTemplate(this.context);
    this.self.innerHTML = html;
    initEvents(this.self);
  }

  public async render(): Promise<void> {
    await this.renderHTML();

    // ---------------------------
    const searchFiltersContainer = new SearchFiltersContainer(undefined);
    this.self.getElementsByClassName('search-left')[0].prepend(searchFiltersContainer.self);
    // ---------------------------

    return this.show();
  }

  constructor(classId: string) {
    super();
    this.self = <HTMLElement>document.createElement('class');
    this.self.id = 'layout';
    bus.add(connections);
    this.render();
  }
}

import * as compiledTemplate from './template.handlebars';
import bus from '../../../../modules/bus/bus';
import initEvents from './events';
// import connections from './connections';
import { CategorySuggest } from '../../../../types';
// import { Comment } from '../../../types';

export default class CategorySuggestItem {
  public self: HTMLAnchorElement;

  // public context: Comment;
  public context: CategorySuggest;

  private async renderHTML() {
    const html = compiledTemplate(this.context);
    this.self.innerHTML = html;
    initEvents(this.self, this.context);
  }

  public async render(): Promise<void> {
    await this.renderHTML();
    return this.show();
  }

  constructor(context: CategorySuggest) {
    this.setContext(context);
    // console.log(this.self)
    /* const li = <HTMLLIElement>document.createElement('li');
    li.className = 'search-suggest'; */
    /* const li = <HTMLLIElement>document.createElement('li');
    li.className = 'search-suggest'; */
    this.self = <HTMLAnchorElement>document.createElement('a');
    // bus.add(connections);
    this.render()
      .then(() => { this.self.href = `/category?name=${this.context.name}`; });
  }

  public setContext(context: CategorySuggest): void {
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

  public erase(): void {
    this.self.remove();
  }
}
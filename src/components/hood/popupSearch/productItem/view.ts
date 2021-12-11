import * as compiledTemplate from './template.handlebars';
import bus from '../../../../modules/bus/bus';
import initEvents from './events';
// import connections from './connections';
import { ProductSuggest } from '../../../../types';
// import { Comment } from '../../../types';

export default class ProductSuggestItem {
  public self: HTMLAnchorElement;

  // public context: Comment;
  public context: ProductSuggest;

  private async renderHTML() {
    const html = compiledTemplate(this.context);
    this.self.innerHTML = html;
    initEvents(this.self, this.context);
  }

  public async render(): Promise<void> {
    await this.renderHTML();
    return this.show();
  }

  constructor(context: ProductSuggest) {
    this.setContext(context);
    /* li.className = 'search-suggest'; */
    this.self = <HTMLAnchorElement>document.createElement('a');
    // bus.add(connections);
    this.render()
      .then(() => { this.self.href = `/product?id=${this.context.id}`; });
  }

  public setContext(context: ProductSuggest): void {
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
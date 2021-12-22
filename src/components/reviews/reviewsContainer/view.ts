import * as compiledTemplate from './template.handlebars';
// import bus from '../../../init/bus';
import initEvents from './events';
// import connections from './connections';
import { myReview } from '../../../types';
import './reviewsContainer.scss';

export default class ReviewsContainer {
  public self: HTMLElement;

  public context: myReview;

  private async renderHTML() {
    const img = <string[]>this.context.product.image;

    const html = compiledTemplate({ ...this.context.comment, ...this.context.product, ...img });
    this.self.innerHTML = html;
    initEvents(this.self, this.context.product.id);
  }

  public async render(): Promise<void> {
    await this.renderHTML();
    return this.show();
  }

  constructor(context: myReview) {
    this.setContext(context);
    this.self = <HTMLElement>document.createElement('ul');
    this.self.className = 'comments-container';
    // bus.add(connections);
    this.render();
  }

  public setContext(context: myReview): void {
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
}

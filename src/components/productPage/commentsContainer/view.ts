import * as compiledTemplate from './template.handlebars';
// import bus from '../../../init/bus';
// import initEvents from './events';
// import connections from './connections';
import { Comment } from '../../../types';
import './commentsContainer.scss';

export default class CommentsContainer {
  public self: HTMLElement;

  public context: Comment;

  private async renderHTML() {
    const html = compiledTemplate(this.context);
    this.self.innerHTML = html;
    // initEvents(this.self);
  }

  public async render(): Promise<void> {
    await this.renderHTML();
    return this.show();
  }

  constructor(context: Comment) {
    this.setContext(context);
    this.self = <HTMLElement>document.createElement('div');
    this.self.className = 'comments-container';
    // bus.add(connections);
    this.render();
  }

  public setContext(context: Comment): void {
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

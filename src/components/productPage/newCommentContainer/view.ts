import * as compiledTemplate from './template.handlebars';
import bus from '../../../modules/bus/bus';
import initEvents from './events';
import connections from './connections';
import { Comment, Product } from '../../../types';
import './newCommentContainer.scss';

// export default class NewCommentContainer {
class NewCommentContainer {
  public self: HTMLElement;

  public context: Product;

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
    // this.setContext(context);
    this.self = <HTMLElement>document.createElement('div');
    this.self.className = 'new-comment-container';
    bus.add(connections);
    this.render();
  }

  public setContext(context: Product): void {
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

  public cleanInput(): void {
    const textInput = <HTMLInputElement>this.self.getElementsByClassName('add-comment-text')[0];
    textInput.value = '';
  }
}

export default new NewCommentContainer();

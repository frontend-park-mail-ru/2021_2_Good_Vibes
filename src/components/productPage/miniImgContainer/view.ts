import * as compiledTemplate from './template.handlebars';
import View from '../../../modules/vibeView/view';
import bus from '../../../modules/bus/bus';
// import './productPage.scss';


export default class MiniImgContainer extends View {
  public src: string;
  public id: number;

  private async renderHTML() {
    const html = compiledTemplate({ src: this.src });
    this.self.innerHTML = html;

    this.self.onclick = (event) => {
      event.preventDefault();

      this.setSelected();
      bus.emit('mini img selected', { id: this.id, src: this.src });
    }
  }

  public async render(): Promise<void> {
    await this.renderHTML();
    return this.show();
  }

  constructor(src: string, id: number) {
    super();
    this.src = src;
    this.id = id;
    this.self = <HTMLElement>document.createElement('div');
    this.self.className = 'mini-img';
    this.render();
  }

  public setSelected() {
    // console.warn('selected', this.id);

    this.self.getElementsByTagName('img')[0].style.border = '2px solid';

  }

  public setUnselected() {
    // console.warn('unselected', this.id);

    this.self.getElementsByTagName('img')[0].style.border = '';
  }
}

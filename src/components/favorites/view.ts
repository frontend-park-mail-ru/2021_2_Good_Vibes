import * as compiledTemplate from "./template.handlebars";
import View from "../../modules/vibeView/view";
import { ViewInterface } from "../../types";
import connections from "./connections";
import bus from "../../modules/bus/bus";
import initEvents from "./events";
import './favorite.scss';

export default class Favorites extends View implements ViewInterface {
  private async renderHTML() {
    const html = compiledTemplate(this.context);
    this.self.innerHTML = html;
    initEvents(this.self);
  }

  public async render(): Promise<void> {
    await this.renderHTML();
    return this.show();
  }

  constructor(classId: string) {
    super();
    this.self = <HTMLElement>document.createElement("class");
    this.self.className = "layout layout__main";
    this.self.id = "layout";
    bus.add(connections);
    this.render();
  }
}

import * as compiledTemplate from "./template.handlebars";
import View from "../../modules/vibeView/view";
import { Product, ViewInterface } from "../../types";
import bus from "../../modules/bus/bus";
import connections from "./connections";
import initEvents from "./events";
import "./productCard.scss";

export default class ProductCard extends View implements ViewInterface {
  private async renderHTML() {
    const img = <string[]>this.context.image;

    const html = compiledTemplate({ ...this.context, ...img });
    this.self.innerHTML = html;
    initEvents(this.self, this.context);
  }

  public async render(): Promise<void> {
    await this.renderHTML();
    if (this.context.sales === true) {
      const sale = <HTMLElement>this.self.getElementsByClassName("gOrdpE")[0];
      const saleContent = <HTMLElement>this.self.getElementsByClassName("kgKATk")[0];
      const border = <HTMLElement>this.self.getElementsByClassName("cXzms")[0];
      sale.style.display = 'block';
      saleContent.style.display = 'block';
      border.style.background = 'linear-gradient(to left bottom, #afeeee, rgb(255, 255, 255))';
      return this.show();
    }
  }

  constructor(className: string, context: Product) {
    super();
    this.setContext(context);
    this.self = <HTMLElement>document.createElement("div");
    this.self.style.margin = "0.5vw";
    bus.add(connections);
    this.render();
  }
}

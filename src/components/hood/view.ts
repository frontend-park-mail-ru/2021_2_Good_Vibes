import * as compiledTemplate from './template.handlebars';
import View from '../../modules/vibeView/view';
import { ViewInterface } from '../../types';
import bus from '../../modules/bus/bus';
import connections from './connections';
import initEvents from './events';
import './hood.scss';

import SearchInput from './searchInput/view';
import user from '../../services/user/user';
import PopupSearch from './popupSearch/view';
import Navbar from './navbar-mobile/view';

export default class Hood extends View implements ViewInterface {
  /* private async renderHTML() {
    const html = compiledTemplate(this.context);
    this.self.innerHTML = html;
    initEvents(this.self);
  } */

  private async renderHTML() {
    const html = compiledTemplate(this.context);
    this.self.innerHTML = html;
    initEvents(this.self);
  }

  public async render(): Promise<void> {
    await this.renderHTML();

    // const searchInput = new SearchInput(undefined);

    // this.self.getElementsByClassName('header__inner')[0].appendChild(searchInput.self);
    // const search = <HTMLElement>this.self.getElementsByClassName('search-suggests')[0];
    // search.style.visibility = 'visible';

    // const popupSearch = new PopupSearch(undefined);

    // this.self.getElementsByClassName('body')[0].appendChild(popupSearch.self);
    // const popup = <HTMLElement>this.self.getElementsByClassName('search-suggests-popup')[0];
    // popup.style.visibility = 'visible';

    // const navbar = new Navbar(undefined);

    // this.self.getElementsByClassName('body')[0].appendChild(navbar.self);
    // const navbarMobile = <HTMLElement>this.self.getElementsByClassName('navbar-mobile')[0];
    // navbarMobile.style.visibility = 'visible';
    // searchInput.show();

    return this.show();
  }

  constructor(className: string) {
    super();
    this.self = <HTMLElement>document.createElement('div');
    this.self.className = className;
    bus.add(connections);
    this.render();
  }
}
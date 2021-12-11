import ajaxConnections from '../ajax/connections';
import Hood from '../view/hood/view';
import bus from './bus';
import initConnections from './connections';

import viewControlConnections from '../viewControl/connections';
import dispatcherConnections from '../dispatcher/connections';
import routerConnections from '../rout/connections';
import userConnections from '../object/user/connecitons';
import cartConnections from '../object/cart/connections';
import Aside from '../view/aside/view';

import SearchInput from '../view/hood/searchInput/view';
import PopupSearch from '../view/hood/popupSearch/view';
import Navbar from '../view/hood/navbar-mobile/view';

const init: () => void = () => {
  bus.add(userConnections);
  bus.add(ajaxConnections);
  bus.add(viewControlConnections);
  bus.add(dispatcherConnections);
  bus.add(routerConnections);
  bus.add(cartConnections);

  bus.add(initConnections);

  bus.emit('cookie check request', undefined);
  bus.emit('cart get request', undefined);
  bus.emit('category get request', undefined);

  const overlayElem = document.createElement('div');
  overlayElem.className = 'overlay';
  document.getElementsByClassName('body')[0].appendChild(overlayElem);

  const hood = new Hood('wrapper');
  document.getElementsByClassName('wrapper')[0].replaceWith(hood.self);

  const aside = new Aside();
  document.getElementsByClassName('aside-container')[0].replaceWith(aside.self);

  const header = <HTMLElement>document.getElementsByClassName('header')[0];
  const footer = <HTMLElement>document.getElementsByClassName('footer')[0];

  header.style.visibility = 'hidden';
  footer.style.visibility = 'hidden';

  // ----------------
  const searchInput = new SearchInput(undefined);

  document.getElementsByClassName('header__inner')[0].appendChild(searchInput.self);
  const search = <HTMLElement>document.getElementsByClassName('search-suggests')[0];
  search.style.visibility = 'visible';

  const popupSearch = new PopupSearch(undefined);

  document.getElementsByClassName('body')[0].appendChild(popupSearch.self);
  const popup = <HTMLElement>document.getElementsByClassName('search-suggests-popup')[0];
  popup.style.visibility = 'visible';

  const navbar = new Navbar(undefined);

  document.getElementsByClassName('body')[0].appendChild(navbar.self);
  const navbarMobile = <HTMLElement>document.getElementsByClassName('navbar-mobile')[0];
  navbarMobile.style.visibility = 'visible';
};

export default init;

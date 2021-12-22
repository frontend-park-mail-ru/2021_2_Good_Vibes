import ajaxConnections from '../api/connections';
import Hood from '../components/hood/view';
import bus from '../modules/bus/bus';
import initConnections from './connections';

import viewControlConnections from '../rout/viewControl/connections';
import dispatcherConnections from '../dispatcher/connections';
import routerConnections from '../rout/connections';
import userConnections from '../services/user/connecitons';
import cartConnections from '../services/cart/connections';
import Aside from '../components/aside/view';

import SearchInput from '../components/hood/searchInput/view';
import PopupSearch from '../components/hood/popupSearch/view';
import Navbar from '../components/hood/navbar-mobile/view';

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

  // header.style.visibility = 'hidden';
  // footer.style.visibility = 'hidden';

  // hood.hide();

  // ----------------
  const searchInput = new SearchInput(undefined);

  document.getElementsByClassName('header__inner')[0].appendChild(searchInput.self);
  const search = <HTMLElement>document.getElementsByClassName('search-suggests')[0];
  search.style.visibility = 'hidden';

  const popupSearch = new PopupSearch(undefined);

  document.getElementsByClassName('body')[0].appendChild(popupSearch.self);
  const popup = <HTMLElement>document.getElementsByClassName('search-suggests-popup')[0];
  popup.style.visibility = 'hidden';

  const navbar = new Navbar(undefined);

  document.getElementsByClassName('body')[0].appendChild(navbar.self);
  const navbarMobile = <HTMLElement>document.getElementsByClassName('navbar-mobile')[0];
  navbarMobile.style.visibility = 'hidden';


  // header.style.visibility = 'hidden';
  // footer.style.visibility = 'hidden';
};

export default init;

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

  const hood = new Hood('grid-container');
  document.getElementsByClassName('grid-container')[0].replaceWith(hood.self);

  const aside = new Aside();
  document.getElementsByClassName('aside-container')[0].replaceWith(aside.self);

  const header = <HTMLElement>document.getElementsByClassName('header')[0];
  const footer = <HTMLElement>document.getElementsByClassName('footer')[0];

  header.style.visibility = 'hidden';
  footer.style.visibility = 'hidden';

  // ----------------
  const searchInput = new SearchInput(undefined);

  document.getElementsByClassName('nav')[0].appendChild(searchInput.self);
  const search = <HTMLElement>document.getElementsByClassName('search-suggests')[0];
  search.style.visibility = 'visible';
};

export default init;

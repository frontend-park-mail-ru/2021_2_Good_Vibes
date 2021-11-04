import ajaxConnections from '../ajax/connections';
import Hood from '../view/hood/view';
import bus from './bus';
import initConnections from './connections';

import viewControlConnections from '../viewControl/connections';
import dispatcherConnections from '../dispatcher/connections';
import routerConnections from '../rout/connections';

const init = () => {
  bus.add(ajaxConnections);
  bus.add(viewControlConnections);
  bus.add(dispatcherConnections);
  bus.add(routerConnections);

  bus.add(initConnections);

  bus.emit('cookie check request', undefined);
  bus.emit('cart get request', undefined);
  bus.emit('category get request', undefined);

  const hood = new Hood('grid-container');
  document.getElementsByClassName('grid-container')[0].replaceWith(hood.self);
};

export default init;
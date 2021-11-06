/* eslint-disable import/extensions */
import eventBus from '../scripts/eventBus.js';

const requests = {
  homepage: 'homepage',
  signin: 'signin',
  signup: 'signup',
  profile: 'profile',
  product: 'product',
  logout: 'homepage',
  cart: 'cart'
};

class Router {
  root;

  constructor() {
    this.routes = {};
  }

  set(root) {
    this.root = root;
  }

  register(path, state) {
    this.routes[path] = {
      state
    };

    return this;
  }

  open(path) {
    const route = this.routes[path];

    if (!route) {
      this.open('/');
    }
  }

  hrefget = (target) => {
    if (target instanceof HTMLAnchorElement) {
      return target;
    }

    const result = target.closest('a');
    if (!result) return undefined;
    if (!this.root.contains(result)) return undefined;

    return result;
  }

  urlHandler = (path) => {
    const state = path.slice(1);
    if (!requests[state]) {
      return 'homepage';
    }

    return requests[state];
  }

  rout = () => {
    const path = window.location.pathname;
    const params = window.location.search;

    console.log(path);

    const regRes = params.match(/\?id=(\d*)/) || [];
    const id = regRes[1];

    const requieredState = this.urlHandler(path);

    eventBus.emit(`${requieredState} state request`, id);
  }

  start() {
    console.log('router start');

    this.root.addEventListener('click', (event) => {
      const target = this.hrefget(event.target);
      if (!target) return;

      console.log(target.pathname);

      this.open(target.pathname);
    });

    window.addEventListener('popstate', this.rout);

    const currentPath = window.location.pathname;

    if (window.location.pathname !== currentPath) {
      const historyState = {
        state: currentPath
      };

      window.history.pushState(
        historyState,
        currentPath,
        currentPath

      );
    }

    eventBus.emit('init');
  }
}

export default new Router();

import bus from '../init/bus';
import routMap from './routMap';

class Router {
  private site = 'https://peaceful-bell-d76220.netlify.app';

  private list: { [pathname: string]: string } = {};

  private root: HTMLElement;

  public set(root: HTMLElement) {
    this.root = root;
  }

  private addToList(pathname: string, state: string) {
    this.list[pathname] = state;
    return this;
  }

  public register() {
    Object.keys(routMap).forEach((key) => this.addToList(key, routMap[key]));
  }

  public add(obj: { 'pathname': string }): void {
    const { pathname } = obj;

    console.log('rout add', pathname);

    let uri = pathname;
    const reg = pathname.match(/(\/.*)\?/);
    if (reg) {
      [, uri] = reg;
    }

    // if (!this.list[uri]) {
    //   console.error('router add error');
    //   return;
    // }

    if (pathname === `${window.location.pathname}${window.location.search}`) {
      return;
    }

    window.history.pushState(
      {
        state: this.list[uri],
      },
      pathname,
      pathname,
    );
  }

  // private handlePathname(pathname: string): string {
  //   if (!this.list[pathname]) {
  //     return this.list['/'];
  //   }

  //   return this.list[pathname];
  // }

  private handlePathname(pathname: string): string {

    console.log('handlePathname', pathname);

    const temp = pathname.match(/\/category\/(.+)/);

    console.log('temp', temp);
    if (temp !== null) {
      return 'category';
    }

    console.log('bruh');

    if (!this.list[pathname]) {
      return this.list['/'];
    }

    return this.list[pathname];

    // return pathname.slice(1);

  }

  private rout: () => void = () => {
    const { pathname, search } = window.location;
    const state = this.handlePathname(pathname);

    console.log('adsf', pathname);

    const idReg = search.match(/.*id=(\d+)/);
    let id: number;
    if (idReg) {
      id = +idReg[1];
    }

    // const nameReg = search.match(/.*name=(\w+)/u);
    // let name = '';
    // if (nameReg) {
    //   name = name.concat(nameReg[1]);
    // }

    const nameReg = pathname.match(/\/category\/(.+)/u);
    let name = '';
    if (nameReg) {
      name = name.concat(nameReg[1]);
    }

    // bus.emit(`${state} state request`, { id, name });

    console.log(`${state} state request`, { id, name, pathname });
    bus.emit(`${state} state request`, { id, name, pathname });
  };

  public start(): void {
    window.addEventListener('popstate', this.rout);

    this.rout();
  }

  public getRoutList(): { [pathname: string]: string } {
    return this.list;
  }
}

export default new Router();

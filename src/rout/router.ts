import bus from '../init/bus';

class Router {
  private site = 'https://peaceful-bell-d76220.netlify.app';

  private list: { [pathname: string]: string } = {};

  private root: HTMLElement;

  public set(root: HTMLElement) {
    this.root = root;
  }

  public register(pathname: string, state: string): Router {
    this.list[pathname] = state;
    return this;
  }

  public add(obj: { 'pathname': string }): void {
    const { pathname } = obj;

    let uri = pathname;
    const reg = pathname.match(/(\/.*)\?/);
    if (reg) {
      [, uri] = reg;
    }

    if (!this.list[uri]) {
      console.error('router add error');
      return;
    }

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

  private handlePathname(pathname: string): string {
    if (!this.list[pathname]) {
      return this.list['/'];
    }

    return this.list[pathname];
  }

  private rout: () => void = () => {
    const { pathname, search } = window.location;
    const state = this.handlePathname(pathname);

    const idReg = search.match(/.*id=(\d+)/);
    let id: number;
    if (idReg) {
      id = +idReg[1];
    }

    const nameReg = search.match(/.*name=(\w+)/u);
    let name = '';
    if (nameReg) {
      name = name.concat(nameReg[1]);
    }

    bus.emit(`${state} state request`, { id, name });
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

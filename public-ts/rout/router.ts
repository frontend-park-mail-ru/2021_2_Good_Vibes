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

    if (!this.list[pathname]) {
      console.error('router add error');
      return;
    }

    if (pathname === window.location.pathname) {
      return;
    }

    window.history.pushState(
      {
        state: this.list[pathname],
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

    bus.emit(`${state} state request`, { params: search });
  };

  public start(): void {
    window.addEventListener('popstate', this.rout);

    this.rout();
  }
}

export default new Router();

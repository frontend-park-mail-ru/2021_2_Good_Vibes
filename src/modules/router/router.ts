import bus from '../bus/bus';
import routMap from '../../rout/routMap';
import { SearchParamsType } from '../../types';
import SearchParams from '../../services/search/params';
// import searchParams from '../../services/search/params';

class Router {
  /* private site = 'https://dreamy-yonath-26f2eb.netlify.app'; */

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

  public add(obj: { 'pathname': string, 'searchParams'?: SearchParamsType, 'str'?: string, 'id'?: number }): void {
    const { pathname, searchParams, str, id } = obj;

    let uri = pathname;
    const reg = pathname.match(/(\/.*)\?/);
    if (reg) {
      [, uri] = reg;
    }

    let path = pathname;

    // if (searchParams || str) {
    //   path = path.concat('?');
    // }


    if (searchParams || str || id) {
      path = path.concat('?');
    }

    if (str) {
      path = path.concat(`str=${decodeURI(str)}&`);
    }

    if (id) {
      path = path.concat(`id=${id}&`);
    }

    // if (searchParams) {
    //   Object.keys(searchParams).forEach((key) => {
    //     if (key === 'str')
    //       return true;

    //     path = path.concat(`${key}=${searchParams[key]}&`);
    //   });
    // }

    if (searchParams && !id) {
      Object.keys(searchParams).forEach((key) => {
        if (key === 'str')
          return true;

        path = path.concat(`${key}=${searchParams[key]}&`);
      });
    }

    if (searchParams || str || id) {
      path = path.slice(0, path.length - 1);
    }

    if (path === `${window.location.pathname}${decodeURI(window.location.search)}`) {
      return;
    }

    // console.warn(path);

    window.history.pushState(
      {
        state: this.list[uri],
        searchParams,
      },
      path,
      path,
    );
  }

  private handlePathname(pathname: string): string {
    const temp = pathname.match(/\/category\/(.+)/);

    // console.warn(this.list, pathname);

    if (temp !== null) {
      return 'category';
    }

    if (!this.list[pathname]) {
      return this.list['/'];
    }

    return this.list[pathname];
  }

  private rout: () => void = () => {
    const { pathname, search } = window.location;
    const state = this.handlePathname(pathname);

    const idReg = search.match(/.*id=(\d+).*/);
    let id: number;
    if (idReg) {
      id = +idReg[1];
    }

    const nameReg = pathname.match(/\/category\/(.+)/u);
    let name = '';
    if (nameReg) {
      name = name.concat(nameReg[1]);
    }

    // debugger;

    const a = new URL(window.location.href);
    a.searchParams.forEach((key, value) => {
      // if (key === 'str') {
      //   console.warn('asdfa');
      //   return true;
      // }

      SearchParams[value] = key;
    });




    let str = '';
    const strReg = decodeURI(search).match(/.*str=([а-яА-Я|\w|\s]+).*/);
    if (strReg) {
      str = strReg[1];
    }

    // console.warn({
    //   id, name, pathname, search: false,
    //   str,
    //   state
    //   // str: search
    // })

    // debugger;

    // export const brandProductStateRequest: Callback = (obj: { 'name': string, id: number }) => {
    //   bus.emit('brand products ajax request', obj);
    // };


    bus.emit(`${state} state request`, {
      id, name, pathname, search: false,
      str,
      // str: search
    });
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

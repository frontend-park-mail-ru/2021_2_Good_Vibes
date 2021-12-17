import { Callback } from '../types';
import router from '../modules/router/router';

export const init: Callback = () => {
  const root = <HTMLElement>document.getElementsByClassName('grid-container')[0];
  router.set(root);

  router.register();
  router.start();
};

export const addToHistory: Callback = (obj: { 'pathname': string }) => {
  router.add(obj);
};

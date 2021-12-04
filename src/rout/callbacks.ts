import { Callback } from '../types';
import router from './router';

export const init: Callback = () => {
  const root = <HTMLElement>document.getElementsByClassName('grit-container')[0];
  router.set(root);

  router.register();
  router.start();
};

export const addToHistory: Callback = (obj: { 'pathname': string }) => {
  router.add(obj);
};

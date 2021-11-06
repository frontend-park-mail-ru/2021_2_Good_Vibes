/* eslint-disable import/extensions */
import router from './router.js';

export const rout = () => {
  router.rout();
};

export const add = (name) => {
  console.log('hist add', name);
  console.log(window.location.pathname);
  console.log(window.location.search);

  let path = window.location.pathname.slice(1);
  const params = window.location.search;

  if (params !== '') {
    path += params;
  }

  if (path !== name) {
    const historyState = {
      state: name
    };

    window.history.pushState(
      historyState,
      name,
      name
    );
  }
};

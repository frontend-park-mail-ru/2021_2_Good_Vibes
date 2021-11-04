import { Callback } from '../types';
import checkList from './checkList';
import bus from '../scripts/bus';
import SignIn from '../view/signin/view';

export const initRequestsCheck: () => void = () => {
  let res = true;

  Object.keys(checkList).forEach((key) => {
    if (checkList[key] === false) {
      res = false;
      return false;
    }
    return true;
  });

  if (!res) {
    return;
  }

  bus.emit('init check success', undefined);

  Object.keys(checkList).forEach((key) => {
    checkList[key] = false;
  });
};

export const cookieCheckFinished: Callback = () => {
  checkList.cookie = true;
  initRequestsCheck();
};

export const cartGetFinished: Callback = () => {
  checkList.cart = true;
  initRequestsCheck();
};

export const categoryGetFinished: Callback = () => {
  checkList.category = true;
  initRequestsCheck();
};

export const signInShow: Callback = () => {
  // bus.emit('signIn state request', undefined);
  bus.emit('profile state request', undefined);
};

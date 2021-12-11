import bus from '../../../init/bus';
import user from '../../../object/user/user';
import { Callback } from '../../../types';

export const signInStateRequest: Callback = () => {
  bus.emit('homepage state request', undefined);
};

const hideSignInContent: Callback = () => {
  const target = <HTMLElement>document.getElementsByClassName('unauthorize-content')[0];
  target.hidden = true;
};

const showSignInContent: Callback = () => {
  const target = <HTMLElement>document.getElementsByClassName('unauthorize-content')[0];
  target.hidden = false;
};

export const authorizeContentHandle: Callback = () => {
  if (user.isAutorize()) {
    hideSignInContent(undefined);
    return;
  }

  showSignInContent(undefined);
};

import bus from '../../init/bus';
import cart from '../../object/cart/cart';
import user from '../../object/user/user';
import router from '../../rout/router';
import { AjaxResponse, Callback } from '../../types';

export const showSignIn: Callback = () => {
  bus.emit('show view', { name: 'signin' });
};

export const showSignUp: Callback = () => {
  bus.emit('show view', { name: 'signup' });
};

export const showProfile: Callback = () => {
  bus.emit('show view', { name: 'profile' });
};

export const showHomepage: Callback = () => {
  bus.emit('show view', { name: 'homepage' });
};

export const signOut: Callback = () => {
  bus.emit('homepage state request', undefined);
};

export const addUser: Callback = (obj: { 'responseText': string }) => {
  const { responseText } = obj;

  Promise.resolve()
    .then(() => JSON.parse(responseText))
    .then((value) => user.set(value))
    .then(() => bus.emit('add user finished', undefined))
    .catch((err) => console.error(err));
};

export const cartGetRequest: Callback = () => {
  bus.emit('cart get request', undefined);
};

export const homepageArray: Callback = (response: AjaxResponse) => {
  const { responseText } = response;

  // console.log(responseText);

  Promise.resolve()
    .then(() => JSON.parse(responseText))
    .then((obj) => console.log(obj))
    .catch((err) => console.log(err));
};

export const homepage: Callback = () => {
  bus.emit('homepage state confirmed', { pathname: '/' });
};

import bus from '../../init/bus';
import user from '../../object/user/user';
import { Callback } from '../../types';

export const signIn: Callback = () => {
  if (user.isAutorize()) {
    bus.emit('signIn state denied', undefined);
    return;
  }

  bus.emit('signIn state confirmed', { pathname: '/signin' });
};

export const signUp: Callback = () => {
  if (user.isAutorize()) {
    bus.emit('signUp state denied', undefined);
    return;
  }

  bus.emit('signUp state confirmed', { pathname: '/signup' });
};

export const profile: Callback = () => {
  if (!user.isAutorize()) {
    bus.emit('profile state denied', undefined);
    return;
  }

  bus.emit('profile state confirmed', { pathname: '/profile' });
};

export const homepage: Callback = () => {
  // bus.emit('homepage state confirmed', { pathname: '/' });
  bus.emit('homepage ajax request', undefined);
};

import bus from '../../init/bus';
import cart from '../../object/cart/cart';
import user from '../../object/user/user';
import { Callback } from '../../types';
import redirect from '../redirect';
// import state from '../state';

export const signIn: Callback = () => {
  if (user.isAutorize()) {
    bus.emit('signIn state denied', undefined);
    return;
  }

  bus.emit('signIn state confirmed', { state: 'signin', pathname: '/signin' });
};

export const signUp: Callback = () => {
  if (user.isAutorize()) {
    bus.emit('signUp state denied', undefined);
    return;
  }

  bus.emit('signUp state confirmed', { state: 'signUp', pathname: '/signup' });
};

export const profile: Callback = () => {
  if (!user.isAutorize()) {
    bus.emit('profile state denied', undefined);
    return;
  }

  bus.emit('profile state confirmed', { state: 'profile', pathname: '/profile' });
};

export const homepage: Callback = () => {
  bus.emit('homepage ajax request', undefined);
};

export const product: Callback = (obj: { 'id': number }) => {
  bus.emit('product ajax request', obj);
};

export const cartState: Callback = () => {
  bus.emit('cart state confirmed', { state: 'cart', pathname: '/cart' });
};

export const address: Callback = () => {
  if (!user.isAutorize()) {
    bus.emit('address state denied', { state: 'address' });
    return;
  }

  if (!cart.isConfirmed() || cart.isEmpty()) {
    bus.emit('address state denied', { state: 'address' });
    return;
  }

  bus.emit('address state confirmed', { state: 'address', pathname: '/address' });
};

export const category: Callback = (obj: { name: string }) => {
  bus.emit('category ajax request', obj);
};

export const payment: Callback = () => {
  if (!user.isAutorize()) {
    bus.emit('payment state denied', { state: 'payment' });
    return;
  }

  if (!cart.isConfirmed() || cart.isEmpty()) {
    bus.emit('payment state denied', { state: 'payment' });
    return;
  }

  bus.emit('payment state confirmed', { state: 'payment', pathname: '/payment' });
};

export const confirmation: Callback = () => {
  if (!user.isAutorize()) {
    bus.emit('confirmation state denied', { state: 'confirmation' });
    return;
  }

  if (!cart.isConfirmed() || cart.isEmpty()) {
    bus.emit('confirmation state denied', { state: 'confirmation' });
    return;
  }

  bus.emit('confirmation state confirmed', { state: 'confirmation', pathname: '/confirmation' });
};

export const savedState: Callback = () => {
  const state = redirect.popSavedState();

  bus.emit(`${state} state request`, undefined);

  // console.log(state.get());

  // bus.emit(`${state.get()} state request`, undefined);
};

export const orders: Callback = () => {
  bus.emit('orders state confirmed', { state: 'orders', pathname: '/orders' });
};

export const search: Callback = (obj: { str: string }) => {
  bus.emit('search ajax request', obj);
};

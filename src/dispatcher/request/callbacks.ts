import bus from '../../modules/bus/bus';
import cart from '../../services/cart/cart';
import user from '../../services/user/user';
import { Callback, OrderRequest } from '../../types';
import redirect from '../redirect';

export const signIn: Callback = () => {
  if (user.isAutorize()) {
    bus.emit('signIn state denied', undefined);
    return;
  }

  // console.log(window.location.pathname);
  // const { pathname } = window.location;

  bus.emit('signIn state confirmed', { state: 'signin', pathname: '/signin' });
  // bus.emit('signIn state confirmed', { state: 'signin', pathname });
};

export const signUp: Callback = () => {
  if (user.isAutorize()) {
    bus.emit('signUp state denied', undefined);
    return;
  }

  bus.emit('signUp state confirmed', { state: 'signUp', pathname: '/signup' });

  // const { pathname } = window.location;
  // bus.emit('signUp state confirmed', { state: 'signUp', pathname });
};

export const profile: Callback = () => {
  if (!user.isAutorize()) {
    bus.emit('profile state denied', undefined);
    return;
  }

  bus.emit('profile state confirmed', { state: 'profile', pathname: '/profile' });

  // const { pathname } = window.location;
  // bus.emit('profile state confirmed', { state: 'profile', pathname });
};

export const homepage: Callback = () => {
  bus.emit('homepage ajax request', undefined);
  bus.emit('recommendation ajax request', undefined);
};

export const product: Callback = (obj: { 'id': number, 'search'?: boolean }) => {
  bus.emit('product ajax request', obj);
};

export const brandProductStateRequest: Callback = (obj: { 'name': string, id: number }) => {
  bus.emit('brand products ajax request', obj);
};

export const cartState: Callback = () => {
  bus.emit('cart state confirmed', { state: 'cart', pathname: '/cart' });
};

export const favorite: Callback = () => {
  // bus.emit('favorite ajax request', undefined);

  if (!user.isAutorize()) {
    bus.emit('signIn state request', undefined);
    return;
  };

  bus.emit('favorite ajax request', undefined);
};

export const brands: Callback = () => {
  bus.emit('brands ajax request', undefined);
};

export const newest: Callback = () => {
  bus.emit('newest ajax request', undefined);
};

export const sales: Callback = () => {
  bus.emit('sales ajax request', undefined);
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

// export const category: Callback = (obj: { name: string }) => {
export const category: Callback = (obj: { name: string, pathname: string, search?: boolean }) => {

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
  // bus.emit('orders state confirmed', { state: 'orders', pathname: '/orders' });

  if (!user.isAutorize()) {
    bus.emit('signIn state request', undefined);
    return;
  };

  bus.emit('orders state confirmed', { state: 'orders', pathname: '/orders' });
};

export const reviews: Callback = () => {
  // bus.emit('reviews state confirmed', { state: 'request', pathname: '/reviews' });

  if (!user.isAutorize()) {
    bus.emit('signIn state request', undefined);
    return;
  };

  bus.emit('reviews state confirmed', { state: 'request', pathname: '/reviews' });
};

export const search: Callback = (obj: { str: string }) => {
  bus.emit('search ajax request', obj);
};

export const cartConfirm: Callback = (obj: OrderRequest) => {
  if (!user.isAutorize()) {
    bus.emit('signIn state request', undefined);
    return;
  }

  bus.emit('cart confirm confirmed', obj);
};

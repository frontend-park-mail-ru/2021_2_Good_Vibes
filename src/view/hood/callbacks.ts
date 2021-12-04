import bus from '../../init/bus';
import { Callback } from '../../types';
import redirect from '../../dispatcher/redirect';

export const homepageStateRequest: Callback = () => {
  bus.emit('homepage state request', undefined);
};

export const profileStateRequest: Callback = () => {
  bus.emit('profile state request', undefined);
};

export const cartStateRequest: Callback = () => {
  bus.emit('cart state request', undefined);
};

export const showAside: Callback = () => {
  bus.emit('show aside', undefined);
};

export const saveState: Callback = (obj: { 'state': string }) => {
  redirect.saveState(obj);
};

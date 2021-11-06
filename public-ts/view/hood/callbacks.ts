import bus from '../../init/bus';
import { Callback } from '../../types';

export const homepageStateRequest: Callback = () => {
  bus.emit('homepage state request', undefined);
};

export const profileStateRequest: Callback = () => {
  bus.emit('profile state request', undefined);
};

export const cartStateRequest: Callback = () => {
  console.log('here will be cart request soon');
};

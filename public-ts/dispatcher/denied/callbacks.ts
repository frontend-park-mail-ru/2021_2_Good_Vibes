import bus from '../../init/bus';
import { Callback } from '../../types';

export const signIn: Callback = () => {
  console.error('signIn state denied');

  bus.emit('profile state request', undefined);
};

export const signUp: Callback = () => {
  console.error('signUp state denied');

  bus.emit('profile state request', undefined);
};

export const profile: Callback = () => {
  console.error('profile state denied');

  bus.emit('signIn state request', undefined);
};

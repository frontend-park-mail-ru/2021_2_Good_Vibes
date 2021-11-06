import bus from '../../init/bus';
import { Callback } from '../../types';

export const signOutRequest: Callback = () => {
  bus.emit('signout ajax request', undefined);
};

export const a = 0;

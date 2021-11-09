import bus from '../../init/bus';
import { Callback } from '../../types';

export const productStateRequest: Callback = (obj: { 'id': number }) => {
  console.log('product state request', obj);

  bus.emit('product state request', obj);
};

export const a = 0;

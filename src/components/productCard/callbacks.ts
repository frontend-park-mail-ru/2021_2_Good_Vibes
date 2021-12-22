import bus from '../../modules/bus/bus';
import { Callback } from '../../types';
import { controlDetails } from '../myOrder/callbacks';

export const productStateRequest: Callback = (obj: { 'id': number }) => {
  console.log('product state request');
  bus.emit('product state request', obj);
};

export const a = 0;
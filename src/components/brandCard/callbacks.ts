import bus from '../../modules/bus/bus';
import { Callback } from '../../types';

export const brandStateRequest: Callback = (obj: { 'name': string, id: number }) => {
  // debugger;
  //продолжать делать страницу брендов отсюда 
  bus.emit('brand product state request', obj);
};

export const a = 0;
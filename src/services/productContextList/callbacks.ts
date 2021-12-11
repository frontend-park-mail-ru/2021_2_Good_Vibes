import { Callback, Product } from '../../types';
import list from './list';

export const addArray: Callback = (array: Product[]) => {
  list.addArray(array);
};

export const add: Callback = (obj: { 'context': Product }) => {
  list.add(obj);
};

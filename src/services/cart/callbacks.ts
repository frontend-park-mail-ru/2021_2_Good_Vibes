import bus from '../../init/bus';
import { AjaxResponse, Callback, CartItem } from '../../types';
import user from '../user/user';
import cart from './cart';

export const load: Callback = (obj: AjaxResponse) => {
  const { responseText } = obj;

  Promise.resolve()
    .then(() => JSON.parse(responseText))

    .then((value: CartItem[]) => {
      if (value) return value;

      if (cart.isEmpty()) {
        return null;
      }

      cart.get().forEach((item) => bus.emit('put product to cart request', { id: item.product_id, number: item.number }));
      return null;
    })

    .then((value) => cart.load(value))
    .then(() => cart.get())
    .catch((err) => console.error('cart get error', err));
};

export const drop: Callback = () => {
  cart.drop();
};

export const put: Callback = (obj: { 'id': number, 'number': number }) => {
  cart.set(obj);
};

export const deleteItem: Callback = (obj: { 'id': number, 'number': number }) => {
  cart.delete(obj);
};

export const handlePutResponse: Callback = (obj: { 'responseText': string }) => {
  const { responseText } = obj;

  Promise.resolve()
    .then(() => JSON.parse(responseText))
    .then((parseObj: CartItem) => bus.emit('put product to cart', { id: parseObj.product_id, number: parseObj.number }))
    .catch((err) => console.error('put product response parse error', err));
};

export const putProductMiddleware: Callback = (obj: { 'id': number, 'number': number }) => {
  if (!user.isAutorize()) {
    bus.emit('put product to cart', obj);
    return;
  }

  bus.emit('put product to cart', obj);
};

export const addProductMiddleware: Callback = (obj: { 'id': number, 'number': number }) => {
  let { number } = obj;
  const { id } = obj;

  number += cart.getItem(id)?.number || 0;

  if (!user.isAutorize()) {
    bus.emit('put product to cart', { id, number });
    return;
  }

  bus.emit('put product to cart request', { id, number });
};

export const deleteProductMiddleware: Callback = (obj: { 'id': number, 'number': number }) => {
  if (!user.isAutorize()) {
    bus.emit('delete product', obj);
    return;
  }

  bus.emit('delete product from cart request', obj);
};

export const handleDeleteResponse: Callback = (obj: { 'responseText': string }) => {
  const { responseText } = obj;

  Promise.resolve()
    .then(() => JSON.parse(responseText))
    .then((parseObj: CartItem) => bus.emit('delete product', { id: parseObj.product_id, number: parseObj.number }))
    .catch((err) => console.error('delete product from cart parse error', err));
};

export const setConfirmed: Callback = () => {
  cart.setConfirmed(true);
};

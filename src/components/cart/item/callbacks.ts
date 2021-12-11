import bus from '../../../modules/bus/bus';
import { Callback, Product } from '../../../types';
import cart from '../../../services/cart/cart';

export const deleteCartItem: Callback = (context: Product) => {
  const { id } = context;
  const { number } = cart.getItem(id);
  bus.emit('delete product from cart', { id, number });
};

export const productStateRequest: Callback = (obj: { 'id': number }) => {
  bus.emit('product state request', obj);
};

// export const calculateSubtotal: Callback = (obj: { 'id': number, 'number': number }) => {
//   console.log(obj);

//   const { id, number } = obj;
//   if (id !== )

// };

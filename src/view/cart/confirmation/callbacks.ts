import cart from '../../../object/cart/cart';
import orderData from '../../../object/orderData/orderData';
import { Callback } from '../../../types';
import productCardList from '../list';

export const showProductArray: Callback = () => {
  const itemsContainer = <HTMLElement>document.getElementsByClassName('items')[0];

  cart.get().forEach((cartItem, index) => {
    const view = productCardList.views[index].self;
    itemsContainer.appendChild(view);

    const { number } = cartItem;
    const numberElem = <HTMLInputElement>view.getElementsByClassName('number')[0];
    numberElem.value = number.toString();
  });
};

export const showAddress: Callback = () => {
  const {
    country,
    city,
    index,
    street,
  } = orderData.address;

  const address = `${index}, ${country}, ${city}, ${street}`;

  const addressField = <HTMLElement>document.getElementsByClassName('address')[0];
  addressField.textContent = address;
};

export const showPayMethod: Callback = () => {
  const payMethod = <HTMLElement>document.getElementsByClassName('payMethod')[0];
  payMethod.textContent = orderData.payMethod;
};

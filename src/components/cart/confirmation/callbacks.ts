import bus from '../../../modules/bus/bus';
import cart from '../../../services/cart/cart';
import orderData from '../../../services/orderData/orderData';
import { Callback, OrderRequest } from '../../../types';
import productCardList from '../list';

export const showProductArray: Callback = () => {
  const itemsContainer = <HTMLElement>document.getElementsByClassName('cart-list__items')[0];

  itemsContainer.textContent = '';

  cart.get().forEach((cartItem) => {
    const view = productCardList.list[cartItem.product_id].view.self;

    itemsContainer.appendChild(view);

    const { number } = cartItem;
    const numberElem = <HTMLInputElement>view.getElementsByClassName('cart__qty-select')[0];
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

export const confirmAjaxRequest: Callback = () => {
  const array = cart.get();

  if (array.length === 0) {
    console.error('cart is empty');
    return;
  }

  const obj: OrderRequest = {
    address: orderData.address,
    products: array,
  };

  bus.emit('cart confirm request', obj);
};

export const calculateSubtotal: Callback = () => {
  // let totalNumber = 0;
  let totalPrice = 0;

  if (!cart.isEmpty()) {
    cart.get().forEach((cartElem) => {
      const { number } = cartElem;
      // totalNumber += number;

      const price = productCardList.list[cartElem.product_id]?.context?.price;
      if (!price) return;

      totalPrice += number * price;
    });
  }

  const itemPriceDiv = <HTMLElement>document.getElementsByClassName('items-price')[0];
  if (!itemPriceDiv) {
    return;
  }
  itemPriceDiv.innerHTML = `$${totalPrice}`;

  const totalPriceDiv = <HTMLElement>document.getElementsByClassName('total-price')[0];
  if (!totalPriceDiv) {
    return;
  }
  totalPriceDiv.innerHTML = `$${totalPrice}`;
};

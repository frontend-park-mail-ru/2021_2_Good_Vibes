import bus from '../../modules/bus/bus';
import cart from '../../services/cart/cart';
import orderData from '../../services/orderData/orderData';
import user from '../../services/user/user';
import { Address, Callback, OrderRequest, Product } from '../../types';
import CartItemList from './list';

export const addressStateRequest: Callback = () => {
  bus.emit('address state request', undefined);
};

export const productArrayRequest: Callback = () => {
  const itemsContainer = <HTMLElement>document.getElementsByClassName('basket__table_body')[0];
  itemsContainer.textContent = '';
  bus.emit('product array request', cart.get());
};

export const calculateSubtotal: Callback = () => {
  let totalPrice = 0;

  if (!cart.isEmpty()) {
    cart.get().forEach((cartElem) => {
      const { number } = cartElem;

      const price = CartItemList.list[cartElem.product_id]?.context?.price;
      if (!price) return;

      const currentPrice = number * price;
      totalPrice += currentPrice;

      const view = <HTMLElement>CartItemList.list[cartElem.product_id].view.self.getElementsByClassName('raw-total-price-calc')[0];
      view.innerHTML = currentPrice.toString();
    });
  }

  // const subElem = <HTMLElement>document.getElementsByClassName('cart__subtotal')[0];
  // if (!subElem) {
  //   return;
  // }
  // subElem.innerHTML = `<h3>Итого (${totalNumber} товаров): $${totalPrice}</h3>`;

  const totalNumberSpan = <HTMLSpanElement>document.getElementsByClassName('basket-order-total__number')[0];
  if (!totalNumberSpan) {
    return;
  }
  totalNumberSpan.innerHTML = `${totalPrice}<span class="currency">₽</span></span></div>`;

  const totalNumberSpanMobile = <HTMLSpanElement>document.getElementsByClassName('basket-form__total_number basket-order-total__number-mobile')[0];
  if (!totalNumberSpanMobile) {
    return;
  }
  totalNumberSpanMobile.innerHTML = `${totalPrice}<span class="currency">₽</span></span></div>`;

};

export const showCartItems: Callback = (array: Product[]) => {
  const itemsContainer = <HTMLElement>document.getElementsByClassName('basket__table_body')[0];
  if (!itemsContainer) {
    return;
  }
  const viewArray = CartItemList.viewArray(array);
  // console.log(viewArray);

  viewArray.forEach((itemView, index) => {
    // console.log(itemView.self);

    itemsContainer.appendChild(itemView.self);
    const { number } = cart.getItem(array[index].id);
    const numberElem = <HTMLInputElement>itemView.self.getElementsByClassName('spinner__count')[0];
    numberElem.value = number.toString();
  });
  calculateSubtotal(undefined);
};

export const deleteView: Callback = (obj: { 'id': number }) => {
  const { id } = obj;
  CartItemList.list[id].view.self.remove();

  delete CartItemList.list[id];
};

export const emptyCartViewControl: Callback = () => {
  if (cart.isEmpty()) {
    // bus.emit('show view', { name: 'emptyCart' });
    bus.emit('cart state request', undefined);
  }
};

export const showEmail: Callback = () => {
  const emailInput = <HTMLInputElement>document.getElementById('orderform-email');
  emailInput.value = user.email;
};

export const confirmAjaxRequest: Callback = () => {

  // if ()

  const array = cart.get();

  if (array.length === 0) {
    console.error('cart is empty');
    return;
  }

  const cityInput = <HTMLInputElement>document.getElementById('orderform-city');
  const streetInput = <HTMLInputElement>document.getElementById('orderform-street');
  const houseInput = <HTMLInputElement>document.getElementById('orderform-house');
  const apartmentInput = <HTMLInputElement>document.getElementById('orderform-apartment');

  // console.log('cityInput', cityInput);

  // orderData.address.city = cityInput.value.trim();
  // orderData.address.street = streetInput.value.trim();
  // orderData.address.house = houseInput.value.trim();
  // orderData.address.flat = apartmentInput.value.trim();

  const addr: Address = {
    city: cityInput.value.trim(),
    street: streetInput.value.trim(),
    house: houseInput.value.trim(),
    flat: apartmentInput.value.trim(),

    country: 'country',
    index: 'index',
  };

  // console.log("addess", addr);

  orderData.setAddress(addr);

  const payMethodSelect = <HTMLSelectElement>document.getElementById('orderform-payment_type');

  orderData.payMethod = payMethodSelect.options[payMethodSelect.selectedIndex].text;

  const emailInput = <HTMLSelectElement>document.getElementById('orderform-email');

  // console.log(orderData);

  const obj: OrderRequest = {
    address: orderData.address,
    products: array,
  };
  bus.emit('cart confirm request', obj);
};

export const confirmMobileAjaxRequest: Callback = () => {
  const array = cart.get();

  if (array.length === 0) {
    console.error('cart is empty');
    return;
  }

  const cityInput = <HTMLInputElement>document.getElementById('mobile-city');
  const streetInput = <HTMLInputElement>document.getElementById('mobile-street');
  const houseInput = <HTMLInputElement>document.getElementById('mobile-house');
  const apartmentInput = <HTMLInputElement>document.getElementById('mobile-apartment');

  // console.log('cityInput', cityInput);

  // orderData.address.city = cityInput.value.trim();
  // orderData.address.street = streetInput.value.trim();
  // orderData.address.house = houseInput.value.trim();
  // orderData.address.flat = apartmentInput.value.trim();

  const addr: Address = {
    city: cityInput.value.trim(),
    street: streetInput.value.trim(),
    house: houseInput.value.trim(),
    flat: apartmentInput.value.trim(),

    country: 'country',
    index: 'index',
  };

  // console.log("addess", addr);

  orderData.setAddress(addr);

  const payMethodSelect = <HTMLSelectElement>document.getElementById('orderform-payment_type');

  orderData.payMethod = payMethodSelect.options[payMethodSelect.selectedIndex].text;

  // console.log(orderData);

  const obj: OrderRequest = {
    address: orderData.address,
    products: array,
  };

  bus.emit('cart confirm request', obj);
};
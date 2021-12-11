import bus from '../../../init/bus';
import { Callback } from '../../../types';
import orderData from '../../../object/orderData/orderData';

export const paymentPageRequest: Callback = () => {
  bus.emit('payment state request', undefined);
};

export const getAddress: Callback = () => {
  const postalCodeInput = <HTMLInputElement>document.getElementsByClassName('form__postalCode')[0];
  const countryInput = <HTMLInputElement>document.getElementsByClassName('form__country')[0];
  const cityInput = <HTMLInputElement>document.getElementsByClassName('form__city')[0];
  const addressInput = <HTMLInputElement>document.getElementsByClassName('form__address')[0];

  const postalCode = postalCodeInput.value.trim();
  const country = countryInput.value.trim();
  const city = cityInput.value.trim();
  const address = addressInput.value.trim();

  orderData.setAddress({
    country,
    city,
    street: address,
    index: postalCode,
  });
};

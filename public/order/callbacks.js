/* eslint-disable import/extensions */
import orderData from '../objects/orderData.js';
import eventBus from '../scripts/eventBus.js';

export const showPayment = () => {
  eventBus.emit('showView', {
    name: 'Payment'
  });
};

export const saveAddress = () => {
  console.log('save address');

  const addressObj = {};

  const addressInput = document.getElementById('address');
  addressObj.street = addressInput.value;

  const cityInput = document.getElementById('city');
  addressObj.city = cityInput.value;

  const postalCodeInput = document.getElementById('postalCode');
  addressObj.index = postalCodeInput.value;

  const countryInput = document.getElementById('country');
  addressObj.country = countryInput.value;

  orderData.setAddress(addressObj);

  // console.log('order data address', orderData.getAddress());
};

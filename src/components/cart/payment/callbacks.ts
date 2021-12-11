import bus from '../../../init/bus';
import orderData from '../../../object/orderData/orderData';
import { Callback } from '../../../types';

export const confirmationStateRequest: Callback = () => {
  bus.emit('confirmation state request', undefined);
};

export const getMethod: Callback = () => {
  const radioArray = document.getElementsByClassName('payment-method');
  const array = Array.from(radioArray);

  array.forEach((element: HTMLInputElement) => {
    if (element.checked) {
      orderData.payMethod = element.labels[0].textContent;
      return false;
    }
    return true;
  });
};

export const a = 0;

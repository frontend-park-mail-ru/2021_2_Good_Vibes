import bus from '../../modules/bus/bus';
import cart from '../../services/cart/cart';
import { OrderRequest } from '../../types';

const initEvents: (self: HTMLElement) => void = (self) => {
  // // -----------------
  // const checkoutBtn = <HTMLButtonElement>self.getElementsByClassName('btn')[0];
  // checkoutBtn.addEventListener('click', (event) => {
  //   event.preventDefault();

  //   bus.emit('checkout button click', undefined);
  // });

  // -----------------
  const checkoutBtn = <HTMLButtonElement>self.getElementsByClassName('confirm-btn')[0];
  self.addEventListener('submit', (event) => {
    /* checkoutBtn.addEventListener('click', (event) => { */
    event.preventDefault();

    bus.emit('checkout button click', undefined);
  });

  // -----------------
  const checkoutBtnMobile = <HTMLButtonElement>self.getElementsByClassName('confirm-btn-mobile')[0];
  checkoutBtnMobile.addEventListener('click', (event) => {
    /* checkoutBtn.addEventListener('click', (event) => { */
    event.preventDefault();

    bus.emit('checkout mobile button click', undefined);
  });

  // -----------------
  const promoInput = <HTMLInputElement>self.getElementsByClassName('promo-input')[0];
  const promoBtn = <HTMLButtonElement>self.getElementsByClassName('promo-btn')[0];
  const promoAlertLabel = <HTMLLabelElement>self.getElementsByClassName('promo-alert-label')[0];

  promoBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const promocode = promoInput.value;

    const obj: OrderRequest = { products: cart.get(), promocode }

    const inputAlertLabel = <HTMLLabelElement>document.getElementsByClassName('promo-alert-label')[0];
    inputAlertLabel.style.color = 'red';
    inputAlertLabel.style.visibility = 'visible';

    bus.emit('cart check request', obj);
  });

  promoInput.oninput = (event) => {
    event.preventDefault();

    promoAlertLabel.style.visibility = 'hidden';

    if (promoInput.value === '') {
      promoBtn.disabled = true;
      return;
    };

    promoBtn.disabled = false;
  }
};

export default initEvents;

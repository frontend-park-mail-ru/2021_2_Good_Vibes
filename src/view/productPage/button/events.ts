import bus from '../../../init/bus';

const initEvents: (self: HTMLElement) => void = (self) => {
  // -----------------------
  const cartBtn = <HTMLButtonElement>self.getElementsByClassName('info-card-btn__add-cart')[0];
  cartBtn.addEventListener('click', (event) => {
    event.preventDefault();

    bus.emit('cart button click', undefined);
  });

  // ----------------------------
};

export default initEvents;

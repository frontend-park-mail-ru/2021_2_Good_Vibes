import bus from '../../init/bus';

const initEvents: (self: HTMLElement) => void = (self) => {
  // // -----------------
  // const checkoutBtn = <HTMLButtonElement>self.getElementsByClassName('btn')[0];
  // checkoutBtn.addEventListener('click', (event) => {
  //   event.preventDefault();

  //   bus.emit('checkout button click', undefined);
  // });

  // -----------------
  const checkoutBtn = <HTMLButtonElement>self.getElementsByClassName('confirm-btn')[0];
  // self.addEventListener('submit', (event) => {
  checkoutBtn.addEventListener('click', (event) => {
    event.preventDefault();

    bus.emit('checkout button click', undefined);
  });
};

export default initEvents;

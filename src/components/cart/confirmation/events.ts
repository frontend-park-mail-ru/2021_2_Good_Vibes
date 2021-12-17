import bus from '../../../modules/bus/bus';

const initEvents: (self: HTMLElement) => void = (self) => {
  // --------------------
  const confirmBtn = <HTMLButtonElement>self.getElementsByClassName('btn')[0];
  confirmBtn.addEventListener('click', (event) => {
    event.preventDefault();

    bus.emit('confirm order button click', undefined);
  });
};

export default initEvents;

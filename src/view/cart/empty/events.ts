import bus from '../../../init/bus';

const initEvents: (self: HTMLElement) => void = (self) => {
  const emptyCartLink = <HTMLElement>self.getElementsByClassName('empty-cart-link')[0];
  emptyCartLink.addEventListener('click', (event) => {
    event.preventDefault();

    bus.emit('empty cart link click', undefined);
  });
};

export default initEvents;

import bus from '../../../modules/bus/bus';

const initEvents: (self: HTMLElement) => void = (self) => {
  // ------------------

  const homeBtn = <HTMLElement>self.getElementsByClassName('navbar-mobile__link--home')[0];

  homeBtn.addEventListener('click', (event) => {
    event.preventDefault();

    bus.emit('logo button click', undefined);
  });

  const cartMobileBtn = <HTMLElement>self.getElementsByClassName('navbar-mobile__link--basket')[0];
  cartMobileBtn.addEventListener('click', (event) => {
    event.preventDefault();

    bus.emit('cart button click', undefined);
  });

  const profileMobileBtn = <HTMLAnchorElement>self.getElementsByClassName('navbar-mobile__link--profile')[0];
  profileMobileBtn.addEventListener('click', (event) => {
    event.preventDefault();

    bus.emit('profile button click', undefined);
  });

  const favoriteMobileBtn = <HTMLElement>self.getElementsByClassName('navbar-mobile__link--favorites')[0];
  favoriteMobileBtn.addEventListener('click', (event) => {
    event.preventDefault();

    bus.emit('favorite button click', undefined);
  });
};

export default initEvents;

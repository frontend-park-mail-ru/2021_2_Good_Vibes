import bus from '../../init/bus';

const initEvents: (self: HTMLElement) => void = (self) => {
  const signInBtn = <HTMLElement>self.getElementsByClassName('auth-content-form-signin__link')[0];
  signInBtn.addEventListener('click', (event) => {
    event.preventDefault();

    bus.emit('signIn toggle button click', undefined);
  });

  const singUpBtn = <HTMLButtonElement>self.getElementsByClassName('auth-btn')[0];
  self.addEventListener('submit', (event) => {
    event.preventDefault();

    bus.emit('signUp submit', undefined);
  });

  const closeBtn = <HTMLElement>self.getElementsByClassName('auth-content-inner__close')[0];
  closeBtn.addEventListener('click', (event) => {
    event.preventDefault();

    bus.emit('close button click', undefined);
  });
};

export default initEvents;

import bus from '../../init/bus';

const initEvents: (self: HTMLElement) => void = (self) => {
  const signUpBtn = <HTMLElement>self.getElementsByClassName('auth-content-form-registration__link')[0];
  signUpBtn.addEventListener('click', (event) => {
    event.preventDefault();

    bus.emit('signUp toggle button click', undefined);
  });

  const signInBtn = <HTMLButtonElement>self.getElementsByClassName('auth-btn')[0];
  self.addEventListener('submit', (event) => {
    event.preventDefault();

    bus.emit('signIn submit', undefined);
  });

  const closeBtn = <HTMLElement>self.getElementsByClassName('auth-content-inner__close')[0];
  closeBtn.addEventListener('click', (event) => {
    event.preventDefault();

    bus.emit('close button click', undefined);
  });
};

export default initEvents;

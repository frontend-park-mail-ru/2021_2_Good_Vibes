import bus from '../../init/bus';

const initEvents: (self: HTMLElement) => void = (self) => {
  const signUpBtn = <HTMLElement>self.getElementsByClassName('register-href')[0];
  signUpBtn.addEventListener('click', (event) => {
    event.preventDefault();

    bus.emit('signUp toggle button click', undefined);
  });

  const signInBtn = <HTMLButtonElement>self.getElementsByClassName('signin-submit')[0];
  self.addEventListener('submit', (event) => {
    event.preventDefault();

    bus.emit('signIn submit', undefined);
  });
};

export default initEvents;

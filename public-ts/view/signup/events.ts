import bus from '../../init/bus';

const initEvents: (self: HTMLElement) => void = (self) => {
  const signInBtn = <HTMLElement>self.getElementsByClassName('signin-href')[0];
  signInBtn.addEventListener('click', (event) => {
    event.preventDefault();

    bus.emit('signIn toggle button click', undefined);
  });

  const singUpBtn = <HTMLButtonElement>self.getElementsByClassName('signup-submit')[0];
  self.addEventListener('submit', (event) => {
    event.preventDefault();

    bus.emit('signUp submit', undefined);
  });
};

export default initEvents;

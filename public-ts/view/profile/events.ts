import bus from '../../init/bus';

const initEvents = (self: HTMLElement) => {
  const signOutBtn = self.getElementsByClassName('signout-button')[0];
  signOutBtn.addEventListener('click', (event) => {
    event.preventDefault();

    bus.emit('signOut button click', undefined);
  });
};

export default initEvents;

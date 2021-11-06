/* eslint-disable import/extensions */

import eventBus from '../scripts/eventBus.js';

const signinEvents = (element) => {
  // ----------------------------------------
  const alertLabel = document.getElementById('alert-label');
  alertLabel.style.visibility = 'hidden';

  // ----------------------------------------
  const signupBtn = document.getElementById('register-href');
  signupBtn.addEventListener('click', (event) => {
    event.preventDefault();

    eventBus.emit('signup click');
  });

  // ----------------------------------------
  element.addEventListener('submit', (event) => {
    event.preventDefault();

    const usernameInput = element.getElementsByClassName('login')[0];
    const passwordInput = element.getElementsByClassName('password')[0];

    const signinData = {
      username: usernameInput.value.trim(),
      password: passwordInput.value.trim()
    };

    eventBus.emit('signin submit', signinData);
  });
};
export default signinEvents;

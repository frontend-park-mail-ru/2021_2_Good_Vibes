/* eslint-disable import/extensions */

import eventBus from '../scripts/eventBus.js';

const signupEvents = (element) => {
  // ----------------------------------------
  const alertLabel = document.getElementById('alert-label');
  alertLabel.style.visibility = 'hidden';

  // ----------------------------------------
  const signinBtn = document.getElementById('signin-href');
  signinBtn.addEventListener('click', (event) => {
    event.preventDefault();

    eventBus.emit('signin click');
  });

  // ----------------------------------------
  element.addEventListener('submit', (event) => {
    event.preventDefault();

    const usernameInput = element.getElementsByClassName('login')[0];
    const emailInput = element.getElementsByClassName('email')[0];
    const passwordInput = element.getElementsByClassName('password')[0];
    const repasswordInput = element.getElementsByClassName('repassword')[0];

    const signupData = {
      username: usernameInput.value.trim(),
      email: emailInput.value.trim(),
      password: passwordInput.value.trim(),
      repassword: repasswordInput.value.trim()
    };

    eventBus.emit('signup submit', signupData);
  });
};
export default signupEvents;

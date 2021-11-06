/* eslint-disable import/extensions */
import eventBus from '../scripts/eventBus.js';
import validate from '../scripts/inputDataValidation.js';
import user from '../objects/user.js';

export const inputCheck = (data) => {
  const response = validate.signUp(data);

  if (response) {
    eventBus.emit('signup validation fail', response);
    return;
  }

  eventBus.emit('signup validation success', data);
};

// export const showSignin = () => {
//   eventBus.emit('showView', {
//     name: 'Signin'
//   });
// };

export const signinStateRequest = () => {
  eventBus.emit('signin state request');
};

export const hideError = () => {
  const alertLabel = document.getElementById('alert-label');
  alertLabel.style.visibility = 'hidden';
};

export const cleanInputs = () => {
  const usernameInput = document.getElementsByClassName('login')[0];
  const emailInput = document.getElementsByClassName('email')[0];
  const passwordInput = document.getElementsByClassName('password')[0];
  const repasswordInput = document.getElementsByClassName('repassword')[0];

  usernameInput.value = '';
  emailInput.value = '';
  passwordInput.value = '';
  repasswordInput.value = '';
};

export const request = (data) => {
  eventBus.emit('signup ajax request', data);
};

export const showError = (error) => {
  const alertLabel = document.getElementById('alert-label');
  alertLabel.innerText = error;
  alertLabel.style.visibility = 'visible';
};

export const addUser = (responseText) => {
  try {
    const responseObj = JSON.parse(responseText);
    user.set(responseObj);
    console.log(user);
  } catch (error) {
    console.error(error);
  }
};

// export const showHomepage = () => {
//   eventBus.emit('showView', {
//     name: 'Homepage'
//   });
// };

export const showSavedState = () => {
  eventBus.emit('show saved state');
};

export const homepageStateRequest = () => {
  eventBus.emit('homepage state request');
};

export const handleFail = (responseText) => {
  try {
    const responseObj = JSON.parse(responseText);
    showError(responseObj['error description']);
  } catch (error) {
    console.error(error);
  }
};

export const addHomepageToHistory = () => {
  eventBus.emit('history add', 'homepage');
};

export const addSigninToHistory = () => {
  eventBus.emit('history add', 'signin');
};

export const cartGetRequest = () => {
  eventBus.emit('cart get request');
};

/* eslint-disable import/extensions */
import eventBus from '../scripts/eventBus.js';
import validate from '../scripts/inputDataValidation.js';
import user from '../objects/user.js';

export const signupStateRequest = () => {
  eventBus.emit('signup state request');
};

// export const homepageStateRequest = () => {
//   eventBus.emit('homepage state request');
// };

export const showSavedState = () => {
  eventBus.emit('show saved state');
};

export const showHomepage = () => {
  eventBus.emit('showView', {
    name: 'Homepage'
  });
};

export const cleanInputs = () => {
  const usernameInput = document.getElementsByClassName('login')[0];
  const passwordInput = document.getElementsByClassName('password')[0];

  usernameInput.value = '';
  passwordInput.value = '';
};

export const inputCheck = (data) => {
  const response = validate.signIn(data);

  if (response) {
    eventBus.emit('signin validation fail', response);
    return;
  }

  eventBus.emit('signin validation success', data);
};

export const request = (data) => {
  eventBus.emit('signin ajax request', data);
};

export const showError = (error) => {
  const alertLabel = document.getElementById('alert-label');
  alertLabel.innerText = error;
  alertLabel.style.visibility = 'visible';
};

export const hideError = () => {
  const alertLabel = document.getElementById('alert-label');
  alertLabel.style.visibility = 'hidden';
};

export const handleFail = (responseText) => {
  try {
    const responseObj = JSON.parse(responseText);
    showError(responseObj['error description']);
  } catch (error) {
    console.error(error);
  }
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

export const addHomepageToHistory = () => {
  eventBus.emit('history add', 'homepage');
};

export const addSignupToHistory = () => {
  eventBus.emit('history add', 'signup');
};

export const cartGetRequest = () => {
  eventBus.emit('cart get request');
};

/* eslint-disable import/extensions */
import * as signup from './callbacks.js';

const signupListeners = [
  {
    event: 'signin click',
    callback: [
      signup.cleanInputs,
      signup.hideError,
      signup.signinStateRequest,
      // signup.addSigninToHistory
    ]
  },
  {
    event: 'signup submit',
    callback: [
      signup.inputCheck
    ]
  },
  {
    event: 'signup validation success',
    callback: [
      signup.hideError,
      signup.request
    ]
  },
  {
    event: 'signup validation fail',
    callback: [
      signup.showError
    ]
  },
  {
    event: 'signup success',
    callback: [
      signup.cleanInputs,
      signup.addUser,
      signup.homepageStateRequest,
      // signup.addHomepageToHistory
      signup.showSavedState,
      signup.cartGetRequest
    ]
  },
  {
    event: 'signup fail',
    callback: signup.handleFail
  }
];

export default signupListeners;

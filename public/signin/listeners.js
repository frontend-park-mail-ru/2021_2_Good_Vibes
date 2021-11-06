/* eslint-disable import/extensions */
import * as signin from './callbacks.js';

const signinListeners = [
  {
    event: 'signup click',
    callback: [
      signin.cleanInputs,
      signin.hideError,
      signin.signupStateRequest,
      // signin.addSignupToHistory
    ]
  },
  {
    event: 'signin submit',
    callback: [
      signin.inputCheck
    ]
  },
  {
    event: 'signin validation success',
    callback: [
      signin.hideError,
      signin.request
    ]
  },
  {
    event: 'signin validation fail',
    callback: [
      signin.showError
    ]
  },
  {
    event: 'signin success',
    callback: [
      signin.cleanInputs,
      signin.addUser,
      // signin.homepageStateRequest,
      // signin.addHomepageToHistory,
      signin.showSavedState,
      signin.cartGetRequest
    ]
  },
  {
    event: 'signin fail',
    callback: signin.handleFail
  }
];

export default signinListeners;

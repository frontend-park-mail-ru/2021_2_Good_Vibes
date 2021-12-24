import { signIn } from '../../dispatcher/request/callbacks';
import { Connection } from '../../types';
import * as signUp from './callbacks';

const connections: Connection[] = [
  {
    event: 'signup shown',
    callback: [
      signUp.hideSearch,
      signUp.hideAlert,
      signUp.cleanInputs,
    ],
  },
  {
    event: 'signup hidden',
    callback:
      signUp.showSearch,
  },
  {
    event: 'signIn toggle button click',
    callback: [
      signUp.SignInShow,
    ],
  },
  {
    event: 'signUp submit',
    callback: signUp.inputDataValidate,
  },
  {
    event: 'show alert',
    callback: signUp.showAlert,
  },
  {
    event: 'hide alert',
    callback: signUp.hideAlert,
  },
  {
    event: 'signUp validation complete',
    callback: signUp.ajaxRequest,
  },
  {
    event: 'signUp ajax denied',
    callback: signUp.handleSignUpDenied,
  },
  {
    event: 'close button click',
    // callback: signUp.savedState,
    callback: signUp.close,
  },
];

export default connections;

import { Connection } from '../../types';
import * as signIn from './callbacks';

const connections: Connection[] = [
  {
    event: 'signin shown',
    callback: [
      signIn.hideAlert,
      signIn.cleanInputs,
    ],
  },
  {
    event: 'signUp toggle button click',
    callback: [
      signIn.SignUpShow,
    ],
  },
  {
    event: 'signIn submit',
    callback: signIn.inputDataValidate,
  },
  {
    event: 'show alert',
    callback: signIn.showAlert,
  },
  {
    event: 'hide alert',
    callback: signIn.hideAlert,
  },
  {
    event: 'signIn validation complete',
    callback: signIn.ajaxRequest,
  },
  {
    event: 'signIn ajax denied',
    callback: signIn.handleSignInDenied,
  },
  {
    event: 'close button click',
    // callback: signIn.savedState,
    callback: signIn.close,

  },
];

export default connections;

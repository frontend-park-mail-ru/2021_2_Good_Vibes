import { addToHistory } from '../../rout/callbacks';
import { Connection } from '../../types';
import * as confirm from './callbacks';
import * as request from '../request/callbacks';

const connections: Connection[] = [
  {
    event: 'signIn state confirmed',
    callback: [
      confirm.showSignIn,
      addToHistory,
    ],
  },
  {
    event: 'signUp state confirmed',
    callback: [
      confirm.showSignUp,
      addToHistory,
    ],
  },
  {
    event: 'profile state confirmed',
    callback: [
      confirm.showProfile,
      addToHistory,
    ],
  },
  {
    event: 'homepage state confirmed',
    callback: [
      confirm.showHomepage,
      addToHistory,
      // confirm.homepageArray,
    ],
  },
  {
    event: 'signout confirmed',
    callback: [
      confirm.signOut,
    ],
  },
  {
    event: 'signIn ajax confirmed',
    callback: [
      confirm.addUser,
      confirm.cartGetRequest,
      request.homepage,
    ],
  },
  {
    event: 'signUp ajax confirmed',
    callback: [
      confirm.addUser,
      confirm.cartGetRequest,
      request.homepage,
    ],
  },
  {
    event: 'homepage ajax confirmed',
    callback: [
      confirm.homepageArray,
      confirm.homepage,
    ],
  },
];

export default connections;

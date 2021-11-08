import { Connection } from '../../types';
import * as profile from './callbacks';

const connections: Connection[] = [
  {
    event: 'signOut button click',
    callback: profile.signOutRequest,
  },
  {
    event: 'profile shown',
    callback: profile.fieldsFill,
  },
  {
    event: 'update button click',
    callback: [
      profile.profileUploadRequest,
      profile.avatarUploadRequest,
    ],
  },
];

export default connections;
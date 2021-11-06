/* eslint-disable import/extensions */
import * as profile from './callbacks.js';

const profileListeners = [
  {
    event: 'mouse enter',
    callback: [
      profile.mouseEnter
    ]
  },
  {
    event: 'mouse leave',
    callback: [
      profile.mouseLeave
    ]
  },
  {
    event: 'upload button click',
    callback: [
      profile.uploadBtnClick
    ]
  },
  {
    event: 'change photo',
    callback: [
      profile.changePhoto
    ]
  },
  {
    event: 'update click',
    callback: [
      // profile.sendLogin,
      profile.avatarUploadRequest,
      profile.profileUploadRequest
    ]
  },
  {
    event: 'logout',
    callback: [
      // profile.signoutStateRequest
      profile.logout,
      // profile.addHomepageToHistory,
      // profile.
    ]
  },

  {
    event: 'avatar upload success',
    callback: [
      profile.avatarUploadSuccess
    ]
  },
  {
    event: 'avatar upload fail',
    callback: [
      profile.avatarUploadFail
    ]
  },

  {
    event: 'Profile shown',
    callback: [
      profile.updateUserInformation
    ]
  },
  {
    event: 'Profile rendered',
    callback: [
      profile.updateUserInformation
    ]
  }
];

export default profileListeners;

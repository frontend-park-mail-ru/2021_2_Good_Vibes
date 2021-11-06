/* eslint-disable import/extensions */
import eventBus from '../scripts/eventBus.js';
import user from '../objects/user.js';


export const mouseEnter = () => {
  const uploadBtn = document.getElementsByClassName('uploadBtn')[0];
  uploadBtn.style.display = "block";
};

export const mouseLeave = () => {
  const uploadBtn = document.getElementsByClassName('uploadBtn')[0];
  uploadBtn.style.display = "none";
}

export const uploadBtnClick = () => {
  const file = document.getElementsByClassName('uploadFile')[0];
  file.style.display = "block";
}

export const changePhoto = (reader) => {
  const img = document.getElementsByClassName('photo')[0];
  img.setAttribute('src', reader.result);
}

export const sendLogin = () => {
  const login = document.getElementsByName('login')[0].value.trim();
  // this.changeLogin(login);

  console.log(user);
};

export const logout = () => {
  eventBus.emit('signout ajax request');
};

export const signoutStateRequest = () => {
  eventBus.emit('signout state request');
};

export const addHomepageToHistory = () => {
  eventBus.emit('history add', 'homepage');
};

export const avatarUploadRequest = () => {
  const file = document.getElementsByClassName('uploadFile')[0];
  const choosedFile = file.files[0];

  if (choosedFile) {
    eventBus.emit('avatar upload request', choosedFile);
  }
};

export const avatarUploadSuccess = (responseText) => {
  console.log('avatar upload success', responseText);

  // const photo = document.getElementsByClassName('photo')[0];
  // photo.srt = responseText;
};

export const avatarUploadFail = (responseText) => {
  console.error('avatar upload fail', responseText);
};

export const updateUserInformation = () => {
  console.log('updateUserInformation');

  const usernameInput = document.getElementById('login');
  const emailInput = document.getElementById('email');
  const photo = document.getElementsByClassName('photo')[0];

  usernameInput.value = user.username;
  emailInput.value = user.email;

  if (!user.avatar) {
    photo.src = 'avatar.jpg';
    return;
  }

  photo.src = user.avatar;
};

export const profileUploadRequest = () => {
  console.log('profileUploadRequest');

  const usernameInput = document.getElementById('login');
  const emailInput = document.getElementById('email');

  const obj = {
    username: usernameInput.value.trim(),
    email: emailInput.value.trim()
  };

  eventBus.emit('profile upload request', obj);
};

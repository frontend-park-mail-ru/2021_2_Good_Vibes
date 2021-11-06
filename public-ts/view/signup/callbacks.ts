import bus from '../../init/bus';
import { Callback } from '../../types';
import validate from '../../validator/inputData';

export const SignInShow: Callback = () => {
  bus.emit('signIn state request', undefined);
};

export const inputDataValidate: Callback = () => {
  const usernameInput = <HTMLInputElement>document.getElementsByClassName('login')[0];
  const emailInput = <HTMLInputElement>document.getElementsByClassName('email')[0];
  const passwordInput = <HTMLInputElement>document.getElementsByClassName('password')[0];
  const repasswordInput = <HTMLInputElement>document.getElementsByClassName('repassword')[0];

  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const repassword = repasswordInput.value.trim();

  const error = validate.signUp({
    username,
    email,
    password,
    repassword,
  });

  if (error) {
    bus.emit('show alert', { error });
    return;
  }

  bus.emit('hide alert', undefined);

  bus.emit('signUp validation complete', { username, password });
};

export const showAlert: Callback = (obj: { 'error': string }) => {
  const { error } = obj;

  const alertLabel = <HTMLLabelElement>document.getElementById('alert-label');
  alertLabel.style.visibility = 'visible';
  alertLabel.textContent = error;
};

export const hideAlert: Callback = () => {
  const alertLabel = <HTMLLabelElement>document.getElementById('alert-label');
  alertLabel.style.visibility = 'hidden';
};

export const ajaxRequest: Callback = (obj: {
  'username': string,
  'email': string,
  'password': string,
  'repassword': string,
}) => {
  bus.emit('signup ajax request', obj);
};

export const handleSignUpDenied: Callback = (obj: { 'responseText': string }) => {
  const { responseText } = obj;
  Promise.resolve()
    .then(() => JSON.parse(responseText))
    .then((value) => bus.emit('show alert', { error: value['error description'] }))
    .catch((error) => console.error('ajax response parse error', error));
};

export const cleanInputs: Callback = () => {
  const usernameInput = <HTMLInputElement>document.getElementsByClassName('login')[0];
  const emailInput = <HTMLInputElement>document.getElementsByClassName('email')[0];
  const passwordInput = <HTMLInputElement>document.getElementsByClassName('password')[0];
  const repasswordInput = <HTMLInputElement>document.getElementsByClassName('repassword')[0];

  usernameInput.value = '';
  emailInput.value = '';
  passwordInput.value = '';
  repasswordInput.value = '';
};

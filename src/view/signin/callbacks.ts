import bus from '../../init/bus';
import { Callback } from '../../types';
import validate from '../../validator/inputData';
// import redirect from '../../dispatcher/redirect';
import state from '../../dispatcher/state';

export const SignUpShow: Callback = () => {
  bus.emit('signUp state request', undefined);
};

export const showAlert: Callback = (obj: { 'error': string }) => {
  const { error } = obj;

  const alertLabel = <HTMLLabelElement>document.getElementsByClassName('auth-content-inner__error')[0];
  alertLabel.style.display = 'block';
  alertLabel.textContent = error;
};

export const hideAlert: Callback = () => {
  const alertLabel = <HTMLLabelElement>document.getElementsByClassName('auth-content-inner__error')[0];
  alertLabel.style.display = 'none';
};

export const inputDataValidate: Callback = () => {
  const usernameInput = <HTMLInputElement>document.getElementsByClassName('user-box__login')[0];
  const passwordInput = <HTMLInputElement>document.getElementsByClassName('user-box__password')[0];

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  const error = validate.signIn({ username, password });

  if (error) {
    bus.emit('show alert', { error });
    return;
  }

  bus.emit('hide alert', undefined);

  bus.emit('signIn validation complete', { username, password });
};

export const ajaxRequest: Callback = (obj: {
  'username': string,
  'password': string,
}) => {
  const { username, password } = obj;

  bus.emit('signin ajax request', { username, password });
};

export const cleanInputs: Callback = () => {
  const usernameInput = <HTMLInputElement>document.getElementsByClassName('user-box__login')[0];
  const passwordInput = <HTMLInputElement>document.getElementsByClassName('user-box__password')[0];

  usernameInput.value = '';
  passwordInput.value = '';
};

export const handleSignInDenied: Callback = (obj: { 'responseText': string }) => {
  const { responseText } = obj;
  Promise.resolve()
    .then(() => JSON.parse(responseText))
    .then((value) => bus.emit('show alert', { error: value['error description'] }))
    .catch((error) => console.error('ajax response parse error', error));
};

export const close: Callback = () => {
  bus.emit('homepage state request', undefined);
};

export const savedState: Callback = () => {
  // const state = redirect.popSavedState();

  // bus.emit(`${state} state request`, undefined);

  // console.log('saved state', state.get());
  // bus.emit(`${state.get()} state request`, undefined);
  bus.emit('saved state request', undefined);
};

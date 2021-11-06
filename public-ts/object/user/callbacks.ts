import bus from '../../init/bus';
import { AjaxResponse, Callback } from '../../types';
import user from './user';

export const set: (response: AjaxResponse) => void = ({ responseText }) => {
  Promise.resolve()
    .then(() => JSON.parse(responseText))
    .then((value) => user.set(value))
    .catch((error) => console.error('not valid ajax response', error));
};

export const del: Callback = () => {
  user.delete();
};

// export const profileRequest: Callback = () => {
//   bus.emit('profile state request', undefined);
// };

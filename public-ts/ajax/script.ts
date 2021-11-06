/** @module Ajax */

/**
 * Объект с Ajax-запросами
 */
const AJAX_METHODS = {
  POST: 'POST',
  GET: 'GET',
};

let csrf: string;

type AjaxCallback = (status: number, text: string) => void;

type AjaxInput = {
  method: string,
  url: string,
  body: JSON,
  callback: AjaxCallback
};

type AvatarUploadInput = {
  method: string,
  url: string,
  callback: AjaxCallback,
  file: File
};

type Request = (arg?: any) => Promise<unknown>;

/**
 * Класс для создания Ajax-запросов
 * @exports
 */
export default class Ajax {
  public static ajax: (arg0: AjaxInput) => void = ({
    method = AJAX_METHODS.GET, url = '/', body = null, callback = () => { },
  }) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.withCredentials = true;
    xhr.setRequestHeader('X-CSRF-Token', csrf);

    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;

      csrf = xhr.getResponseHeader('X-Csrf-Token');

      callback(xhr.status, xhr.responseText);
    });

    if (body) {
      xhr.setRequestHeader('Content-type', 'application/json; charser=utf8');
      xhr.send(JSON.stringify(body));
      return;
    }

    xhr.send();
  };

  public static get: Request = (args = {}) => new Promise((resolve, reject) => {
    this.ajax({
      ...args,
      method: AJAX_METHODS.GET,
      callback: (status, responseText) => {
        if (status < 300) {
          resolve({
            status,
            responseText,
          });
          return;
        }

        // eslint-disable-next-line prefer-promise-reject-errors
        reject({
          status,
          responseText,
        });
      },
    });
  });

  public static post: Request = (args = {}) => new Promise((resolve, reject) => {
    this.ajax({
      ...args,
      method: AJAX_METHODS.POST,
      callback: (status, responseText) => {
        if (status < 300) {
          resolve({
            status,
            responseText,
          });
          return;
        }

        // eslint-disable-next-line prefer-promise-reject-errors
        reject({
          status,
          responseText,
        });
      },
    });
  });

  static avatarUpload: (arg0: AvatarUploadInput) => void = ({
    method = AJAX_METHODS.GET, url = '/', callback = () => { }, file = undefined,
  }) => {
    const formData = new FormData();

    // const file = document.getElementsByClassName('uploadFile')[0];

    // const choosedFile = file.files[0];

    formData.append('file', file);

    console.log(formData);

    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.withCredentials = true;
    xhr.setRequestHeader('X-CSRF-Token', csrf);

    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;

      csrf = xhr.getResponseHeader('X-Csrf-Token');

      callback(xhr.status, xhr.responseText);
    });

    xhr.send(formData);
  };
}

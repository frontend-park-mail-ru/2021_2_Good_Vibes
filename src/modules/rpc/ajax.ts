/** @module Ajax */

import { AjaxResponse } from '../../types';

/**
 * Объект с Ajax-запросами
 */
const AJAX_METHODS = {
  POST: 'POST',
  GET: 'GET',
};

let csrf: string;

type AjaxCallback = (response: AjaxResponse) => void;

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

      callback({ status: xhr.status, responseText: xhr.responseText });
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
      callback: (response: AjaxResponse) => {
        const { status } = response;
        if (status < 300) {
          resolve(response);
          return;
        }

        // eslint-disable-next-line prefer-promise-reject-errors
        reject(response);
      },
    });
  });

  public static post: Request = (args = {}) => new Promise((resolve, reject) => {
    this.ajax({
      ...args,
      method: AJAX_METHODS.POST,
      callback: (response: AjaxResponse) => {
        const { status } = response;
        if (status < 300) {
          resolve(response);
          return;
        }

        // eslint-disable-next-line prefer-promise-reject-errors
        reject(response);
      },
    });
  });

  static avatarUpload: (arg0: AvatarUploadInput) => void = ({
    method = AJAX_METHODS.GET, url = '/', callback = () => { }, file = undefined,
  }) => {
    const formData = new FormData();

    formData.append('file', file);

    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.withCredentials = true;
    xhr.setRequestHeader('X-CSRF-Token', csrf);

    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;

      csrf = xhr.getResponseHeader('X-Csrf-Token');

      callback({ status: xhr.status, responseText: xhr.responseText });
    });

    xhr.send(formData);
  };
}

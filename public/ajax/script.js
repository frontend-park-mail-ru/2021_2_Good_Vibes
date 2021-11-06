/** @module Ajax */

/**
 * Объект с Ajax-запросами
 */
const AJAX_METHODS = {
  POST: 'POST',
  GET: 'GET'
};

let csrf;

/**
 * Класс для создания Ajax-запросов
 * @exports
 */
export default class Ajax {

  /**
   * Ajax коллбэк
   * @callback AjaxCallback
   * @param {{status: number,
   * responseText: string}}
   */
  /**
   * Обертка для создания Ajax-запросов
   * @private
   * @static
   * @param {{AJAX_METHOD: string,
   * url: string,
   * body: JSON,
   * callback: AjaxCallback}} inputObj - объект с данными для Ajax-запроса
   */
  static #ajax({
    method = AJAX_METHODS.GET, url = '/', body = null, callback = () => { },
  }) {
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
  }

  /**
   * GET-запрос с использованием промисов
   * @static
   * @public
   * @param {... args} args - параметры для Ajax-запроса
   * @returns промис о выполнении или невыполнении запроса
   */
  static get(args = {}) {
    return new Promise((resolve, reject) => {
      this.#ajax({
        ...args,
        method: AJAX_METHODS.GET,
        callback: (status, responseText) => {
          if (status < 300) {
            resolve({
              status,
              responseText
            });
            return;
          }

          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            status,
            responseText
          });
        }
      });
    });
  }

  /**
   * POST-запрос с использованием промисов
   * @static
   * @public
   * @param {... args} args - параметры для Ajax-запроса
   * @returns промис о выполнении или невыполнении запроса
   */
  static post(args = {}) {
    return new Promise((resolve, reject) => {
      this.#ajax({
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
            responseText
          });
        }
      });
    });
  }

  static avatarUpload({
    method = AJAX_METHODS.GET, url = '/', callback = () => { }, file = undefined
  }) {
    var formData = new FormData();

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
  }
}

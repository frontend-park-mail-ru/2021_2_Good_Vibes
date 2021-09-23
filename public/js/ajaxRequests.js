import AuthorizView from '../Components/AuthorizView/AuthorizView.js'
import HomeView from '../Components/HomeView/HomeView.js';

(function ajaxRequests() {
  const AJAX_STATUS = {
    OK: 200,
    CREATED: 201,
  };

  // ------------------------------
  function homeViewRequest() {
    root.innerHTML = '';

    Ajax.ajaxGet({
      url: '/me',
      callback: (status, responseText) => {
        let isAuthorized = false;

        if (status === AJAX_STATUS.OK) {
          isAuthorized = true;
        }

        if (isAuthorized) {
          try {
            const user = JSON.parse(responseText);
            const homeView = new HomeView(root);
            homeView.user = user;
            homeView.render();
          } catch (e) {
            alert('JSON parse error'); // обработать ошибки
            const authorizView = new AuthorizView(root);
            authorizView.render();
            return;
          }
          return;
        }

        const authorizView = new AuthorizView(root);
        authorizView.render();
      },
    });
  }
  window.homeViewRequest = homeViewRequest;

  // ------------------------------
  function logOutRequest() {
    Ajax.ajaxPost({
      url: '/logout',
      callback: (status, responseText) => {
        if (status === AJAX_STATUS.OK) {
          homeViewRequest();
          return;
        }

        JSON.parse(responseText, (key, value) => {
          if (key !== '') {
            alert(value);
          }
        });
      },
    });
  }
  window.logOutRequest = logOutRequest;

  // ------------------------------
  function logInRequest({ body, alertObject }) {
    Ajax.ajaxPost({
      url: '/login',
      body,
      callback: (status, responseText) => {
        if (status === AJAX_STATUS.OK) {
          homeViewRequest();
          return;
        }

        JSON.parse(responseText, (key, value) => {
          if (key !== '') {
            alertObject.innerText = value;
            alertObject.style.visibility = 'visible';
          }
        });
      },
    });
  }
  window.logInRequest = logInRequest;

  // ------------------------------
  function signUpRequest({ body, alertObject }) {
    Ajax.ajaxPost({
      url: '/signup',
      body,
      callback: (status, responseText) => {
        if (status === AJAX_STATUS.CREATED) {
          homeViewRequest();
          return;
        }

        JSON.parse(responseText, (key, value) => {
          if (key !== '') {
            alertObject.innerText = value;
            alertObject.style.visibility = 'visible';
          }
        });
      },
    });
  }
  window.signUpRequest = signUpRequest;
}()
);
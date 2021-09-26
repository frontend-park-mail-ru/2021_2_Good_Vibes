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
      url: 'https://ozonback.herokuapp.com/me',
      callback: (status, responseText) => {
        let isAuthorized = false;

        if (status === AJAX_STATUS.OK) {
          isAuthorized = true;
        }

        if (isAuthorized) {
          // console.log(isAuthorized);
          try {
            // const user = JSON.parse(responseText);

            // root.innerHTML = `${responseText}`;

            // const homeView = new HomeView(root);
            // homeView.user = user;
            // homeView.render();
          } catch (e) {
            // alert(responseText);
            // const authorizView = new AuthorizView(root);
            // authorizView.render();
            // return;
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
      url: 'https://ozonback.herokuapp.com/logout',
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
      url: 'https://ozonback.herokuapp.com/login',
      body,
      callback: (status, responseText) => {
        if (status === AJAX_STATUS.OK) {
          // homeViewRequest();

          // const homeView = new HomeView(root);
          // homeView.user = responseText;
          // homeView.render();

          return;
        }

        // JSON.parse(responseText, (key, value) => {
        //   if (key !== '') {
        //     // alertObject.innerText = value;
        //     alertObject.innerText = value;
        //     alertObject.style.visibility = 'visible';
        //   }
        // });

        alert(responseText);
      },
    });
  }
  window.logInRequest = logInRequest;

  // ------------------------------
  function signUpRequest({ body, alertObject }) {
    Ajax.ajaxPost({
      url: 'https://ozonback.herokuapp.com/signup',
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

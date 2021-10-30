/* eslint-disable import/extensions */
import state from './states.js';
import constructors from './constructors.js';
import eventBus from '../scripts/eventBus.js';
import user from '../objects/user.js';

export const hide = {};
export const show = {};

let view = {};

let currentState = '';


const add = (obj) => {
  view = Object.assign(view, obj);
};

const remove = (name) => {
  view[name].delete();
  delete view[name];
};

const visibleControl = (targetName) => {
  const main = document.getElementById('main-container');

  if (view[targetName]) {
    if (view[targetName].state === state.hidden) {
      view[targetName].element.show();
      view[targetName].state = state.visible;
      main.replaceWith(view[targetName].dom);
    }
  }

  Object.keys(view).forEach((key) => {
    if (key !== targetName && key !== 'Hood') {
      view[key].element.hide();
      view[key].state = state.hidden;
    }
  });
};

const viewGenerate = ({ name, context }) => {
  const main = document.getElementById('main-container');

  const buffView = document.createElement('main');
  buffView.id = 'main-container';

  const buffObj = new constructors[name](buffView);

  let viewName = name;
  if (context?.id) {
    viewName += context.id;
  }

  add({
    [viewName]: {
      element: buffObj,
      dom: buffView,
      state: state.hidden
    }
  });

  view[viewName].state = state.visible;
  console.log(main);
  main.replaceWith(view[viewName].dom);

  if (view[viewName].element?.setContext) {
    view[viewName].element.setContext(context);
  }
  // console.log(view[viewName].element.setContext);

  return view[viewName].element.render();
};

export const showView = ({ name, context }) => {
  console.log(`${name} view`);

  // eventBus.emit('history add', name);

  let viewName = name;
  if (context?.id) {
    viewName += context.id;
  }

  if (!view[viewName]) {
    return viewGenerate({ name, context })
      .then(() => visibleControl(viewName));
  }

  return visibleControl(viewName);
};

export const viewCheck = () => {
  console.log(view);
};

export const init = () => {
  const root = document.getElementsByClassName('grid-container')[0];
  const buffObj = new constructors.Hood(root);
  add({
    Hood: {
      element: buffObj,
      dom: root,
      state: state.hidden
    }
  });

  eventBus.emit('cookie check request');

  view.Hood.state = state.visible;
  return view.Hood.element.render()
    // .then(() => console.log('adsfasdf'))
    .then(() => eventBus.emit('hood render finished'));
  // .then(() => viewGenerate({ name: 'Homepage' }));
  // .then(() => {
  //   eventBus.emit('homepage ajax request');
  // });
};

export const showSignin = () => {
  eventBus.emit('showView', {
    name: 'Signin'
  });
};

export const showSignup = () => {
  eventBus.emit('showView', {
    name: 'Signup'
  });
};

export const showProfile = () => {
  eventBus.emit('showView', {
    name: 'Profile'
  });
};

export const showHomepage = () => {
  eventBus.emit('showView', {
    name: 'Homepage'
  });
};

export const showProduct = (responseText) => {
  const responseObj = JSON.parse(responseText);

  console.log(responseText);

  eventBus.emit('showView', {
    name: 'Product',
    context: responseObj
  });
};

export const showPayment = () => {
  eventBus.emit('showView', {
    name: 'Payment'
  });
};

// export const rout = ({ name, context }) => {
//   // console.log(name, context);
//   eventBus.emit('rout', name);
// };

// ==================================
export const homepageStateRequest = () => {
  eventBus.emit('homepage state confirmed', 'homepage');
};

export const homepageStateConfirmed = () => {
  showHomepage();

  currentState = 'homepage';
  // eventBus.emit('history add', currentState);
};

export const homepageStateDenied = () => {
  console.error('homepage state denied');
};

// ==================================
export const profileStateRequest = () => {
  if (user.username) {
    eventBus.emit('authorization', user);
    return;
  }

  eventBus.emit('profile ajax request');
};

export const profileStateConfirmed = () => {
  showProfile();

  currentState = 'profile';
  // eventBus.emit('history add', currentState);
};

export const profileStateDenied = () => {
  eventBus.emit('signin state request');

  // showSignin();
};

// ==================================
export const addUser = (responseText) => {
  // try {
  //   const responseObj = JSON.parse(responseText);
  //   user.set(responseObj);
  //   console.log(user);
  // } catch (error) {
  //   console.error(error);
  // }
  console.log(responseText);

  user.username = responseText;
  console.log(user);
};

export const deleteUser = () => {
  user.delete();
};

export const cookieCheckFail = () => {
};

// ==================================
export const signinStateRequest = () => {
  // console.log(user);

  if (user.username) {
    eventBus.emit('signin state denied');
    return;
  }

  let callback2;

  const callback = ({ responseText }) => {
    addUser(responseText);
    eventBus.emit('signin state denied');

    eventBus.off('cookie check success', callback);
    eventBus.off('cookie check fail', callback2);
    // console.log(eventBus);
  };
  eventBus.on('cookie check success', callback);

  callback2 = () => {
    eventBus.emit('signin state confirmed', 'signin');

    eventBus.off('cookie check success', callback);
    eventBus.off('cookie check fail', callback2);
    // console.log(eventBus);
  };
  eventBus.on('cookie check fail', callback2);

  eventBus.emit('cookie check request');
};

export const signinStateDenied = () => {
  console.error('signin state denied');

  eventBus.emit('homepage state request');
};

export const signinStateConfirmed = () => {
  showSignin();

  currentState = 'signin';
  // eventBus.emit('history add', currentState);
};

// ==================================
export const signupStateRequest = () => {
  // console.log(user);

  if (user.username) {
    eventBus.emit('signup state denied');
    return;
  }

  let callback2;

  const callback = ({ responseText }) => {
    addUser(responseText);
    eventBus.emit('signup state denied');

    eventBus.off('cookie check success', callback);
    eventBus.off('cookie check fail', callback2);
    // console.log(eventBus);
  };
  eventBus.on('cookie check success', callback);

  callback2 = () => {
    eventBus.emit('signup state confirmed', 'signup');

    eventBus.off('cookie check success', callback);
    eventBus.off('cookie check fail', callback2);
    // console.log(eventBus);
  };
  eventBus.on('cookie check fail', callback2);

  eventBus.emit('cookie check request');
};

export const signupStateDenied = () => {
  console.error('signup state denied');

  eventBus.emit('homepage state request');
};

export const signupStateConfirmed = () => {
  showSignup();

  currentState = 'signup';

  // eventBus.emit('history add', currentState);
};

export const histAdd = (name) => {
  eventBus.emit('history add', name);
};

// ==================================
export const productStateRequest = (id) => {
  let callback2;

  const callback = ({ responseText }) => {
    eventBus.emit('product state confirmed', responseText);

    eventBus.off('product request success', callback);
    eventBus.off('product request fail', callback2);
  };
  eventBus.on('product request success', callback);

  callback2 = ({ responseText }) => {
    eventBus.emit('product state denied', responseText); //=========================================================================

    eventBus.off('product request success', callback);
    eventBus.off('product request fail', callback2);
  };
  eventBus.on('product request fail', callback2);

  eventBus.emit('product ajax request', id);
};

export const productStateConfirmed = (responseText) => {
  console.log('productStateConfirmed');

  showProduct(responseText);

  // currentState = 'product';

  console.log(responseText.match(/."id":(\d*)/)[1]);
  currentState = `product${responseText.match(/."id":(\d*)/)[1]}`;
};

export const productStateDenied = (responseText) => {
  console.log('productStateDenied', responseText);

  showHomepage();

  currentState = 'homepage';
};

// ==================================
export const signoutStateRequest = () => {
  // if (user.username) {
  //   eventBus.emit('signout state denied');
  //   return;
  // };


}


// ========================
export const profileStateConfirmedEmit = () => {
  eventBus.emit('profile state confirmed', 'profile');
};

export const profileStateDeniedEmit = () => {
  eventBus.emit('profile state denied');
};


// ======================================
let stateToSave = '';
export const saveCurrentState = () => {
  stateToSave = currentState;
  // console.log('page to save', stateToSave);
};

export const showSavedState = () => {
  // console.log('state to show', stateToSave);

  if (!stateToSave) {
    stateToSave = 'homepage';
  }

  const temp = stateToSave.match(/(\D+)/);
  console.log('reg exp', temp[1]);

  const temp2 = stateToSave.match(/\D+(\d+)/);
  if (!temp2) {
    eventBus.emit(`${temp[1]} state request`);
    return;
  }
  console.log('reg exp', temp2[1]);

  eventBus.emit(`${temp[1]} state request`, temp2[1]);
};

export const productContextRequest = () => {
  // console.log(currentState);
  const viewName = currentState[0].toUpperCase() + currentState.slice(1);
  const viewObj = view[viewName].element;

  eventBus.emit('product context response', viewObj.getContext());
  // console.log(temp3.getContext());
};


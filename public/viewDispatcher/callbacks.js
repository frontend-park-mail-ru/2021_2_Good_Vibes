/* eslint-disable import/extensions */
import state from './states.js';
import constructors from './constructors.js';
import eventBus from '../scripts/eventBus.js';
import user from '../objects/user.js';
import cart from '../objects/cart.js';
import Aside from '../aside/view.js';


export const hide = {};
export const show = {};

let view = {};

let currentState = '';

let currentCart = [];


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

  console.log(`${targetName} shown`);
  eventBus.emit(`${targetName} shown`, targetName);
};

const viewGenerate = ({ name, context }) => {
  // console.log('context', context);

  const main = document.getElementById('main-container');

  const buffView = document.createElement('main');
  buffView.id = 'main-container';

  const buffObj = new constructors[name](buffView);

  let viewName = name;
  if (context?.id) {
    viewName += context.id;
  }

  if (context?.category) {
    viewName += context.category;
  }

  add({
    [viewName]: {
      element: buffObj,
      dom: buffView,
      state: state.hidden
    }
  });

  view[viewName].state = state.visible;

  main.replaceWith(view[viewName].dom);

  console.log(main);

  if (view[viewName].element?.setContext) {
    view[viewName].element.setContext(context);
  }
  // console.log(view[viewName].element.setContext);

  return view[viewName].element.render()
    .then(() => { eventBus.emit(`${viewName} rendered`, viewName); });
};

export const showView = ({ name, context }) => {
  console.log(`${name} view`);

  // eventBus.emit('history add', name);

  let viewName = name;
  if (context?.id) {
    viewName += context.id;
  }

  if (context?.category) {
    viewName += context.category;
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

export const cookieCheckRequest = () => {
  eventBus.emit('cookie check request');
};

export const cartGetRequest = () => {
  eventBus.emit('cart get request');
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
  eventBus.emit('cart get request');
  eventBus.emit('category get request');

  view.Hood.state = state.visible;
  return view.Hood.element.render()
    .then(() => console.log('hood render finished'))

    // .then(() => eventBus.emit('cart get request'))
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

export const showCart = () => {
  eventBus.emit('showView', {
    name: 'Cart'
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

export const showCategory = (categoryName) => {
  // const responseObj = JSON.parse(responseText);

  // console.log(responseText);

  const context = {
    category: categoryName
  };

  eventBus.emit('showView', {
    name: 'CategoryPage',
    context
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
  user.set(JSON.parse(responseText));

  console.log('user', user);
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

  eventBus.emit('signin state confirmed', 'signin');

  // let callback2;

  // const callback = ({ responseText }) => {
  //   addUser(responseText);
  //   eventBus.emit('signin state denied');

  //   eventBus.off('cookie check success', callback);
  //   eventBus.off('cookie check fail', callback2);
  //   // console.log(eventBus);
  // };
  // eventBus.on('cookie check success', callback);

  // callback2 = () => {
  //   eventBus.emit('signin state confirmed', 'signin');

  //   eventBus.off('cookie check success', callback);
  //   eventBus.off('cookie check fail', callback2);
  //   // console.log(eventBus);
  // };
  // eventBus.on('cookie check fail', callback2);

  // eventBus.emit('cookie check request');
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

  eventBus.emit('signup state confirmed', 'signup');

  // let callback2;

  // const callback = ({ responseText }) => {
  //   addUser(responseText);
  //   eventBus.emit('signup state denied');

  //   eventBus.off('cookie check success', callback);
  //   eventBus.off('cookie check fail', callback2);
  //   // console.log(eventBus);
  // };
  // eventBus.on('cookie check success', callback);

  // callback2 = () => {
  //   eventBus.emit('signup state confirmed', 'signup');

  //   eventBus.off('cookie check success', callback);
  //   eventBus.off('cookie check fail', callback2);
  //   // console.log(eventBus);
  // };
  // eventBus.on('cookie check fail', callback2);

  // eventBus.emit('cookie check request');
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

  // console.log(responseText.match(/."id":(\d*)/)[1]);
  // currentState = `product${responseText.match(/."id":(\d*)/)[1]}`;

  const id = responseText.match(/."id":(\d*)/)[1];
  const category = responseText.match(/.*"category":"(\w*)"/)[1];
  console.log('id', id);
  console.log('category', category);

  currentState = `product${id}${category}`;

  console.log('current state', currentState);
};

export const productStateDenied = (responseText) => {
  console.log('productStateDenied', responseText);

  showHomepage();

  currentState = 'homepage';
};

// ==================================
// export const signoutStateRequest = () => {
//   // if (user.username) {
//   //   eventBus.emit('signout state denied');
//   //   return;
//   // };


// }


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
  console.log('state to show', stateToSave);

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

export const addToCart = ({ responseText }) => {
  const obj = JSON.parse(responseText);

  // cart.add({
  //   id: obj.product_id,
  //   number: obj.number
  // });

  cart.set({
    id: obj.product_id,
    number: obj.number
  });
};

// // ================================
// export const productRequest = (id) => {
//   let callback2;

//   const callback = ({ responseText }) => {
//     eventBus.emit('product confirmed', responseText);

//     eventBus.off('product request success', callback);
//     eventBus.off('product request fail', callback2);
//   };
//   eventBus.on('product request success', callback);

//   callback2 = ({ responseText }) => {
//     eventBus.emit('product denied', responseText); //=========================================================================

//     eventBus.off('product request success', callback);
//     eventBus.off('product request fail', callback2);
//   };
//   eventBus.on('product request fail', callback2);

//   eventBus.emit('product ajax request', id);
// };

export const productConfirmed = (responseText) => {
  // console.log(responseText);
  const obj = JSON.parse(responseText);
  currentCart.push(obj);

  // console.log(currentCart);
};

export const productDenied = (responseText) => {
  console.log(responseText);
};

export const cartGetSuccess = ({ responseText }) => {
  console.log('cartGetSuccess', responseText);

  const obj = JSON.parse(responseText);

  cart.setExist(true);

  obj.forEach((element) => {
    cart.set({
      id: element.product_id,
      number: element.number
    });
  });

  console.log(cart);
};

// export const productArrayRequest = () => {
//   eventBus.emit('product array request', currentCart);
// };

export const productArrayRequestSuccess = (array) => {   // для получения корзины
  console.log('productArrayRequestSuccess');

  currentState = 'cart';

  const promise = new Promise((resolve) => { resolve(); });

  promise
    .then(() => showCart())
    .then(() => eventBus.emit('add product array to cart view', array))
    // .then(() => {
    //   console.log('view.Cart.element', view.Cart.element);
    // })
    .catch((err) => console.error(err));


};

export const productArrayRequestFail = (responseText) => {
  console.error(responseText);
};

export const subtotal = () => {
  console.log('subtotal');
  view.Cart.element.createSubtotalHTML();
};

// =======================

export const cartStateRequest = () => {
  console.log('cart state request');

  console.log(user);
  console.log(cart);

  if (user.username) {
    eventBus.emit('cart state confirmed', 'cart');

    return;
  }
  eventBus.emit('cart state denied');
};

export const cartStateConfirmed = () => {
  console.log('cartStateConfirmed');

  showCart();

  eventBus.emit('product array request', cart.get());
};

export const cartStateDenied = () => {
  console.log('cartStateDenied');
  console.error('cart state denied');

  eventBus.emit('signin state request');
  // showSavedState();
};

// export const cartGetRequest = () => {
//   eventBus.emit('cart get request');

//   // console.log('cart get request event');

//   // setTimeout(() => {
//   //   eventBus.emit('cart get request');
//   // }, 3000);
// };

export const dropCart = () => {
  cart.drop();
};

export const renderAside = () => {
  const asideObj = document.getElementById('aside-container');
  console.log(asideObj);
  const aside = new Aside(asideObj);
  console.log(aside.element);
  aside.render();
};

export const cleanCartView = () => {
  eventBus.emit('cart clean');
};

export const categoryGetSuccess = (responseText) => {
  console.log('category get success');

  const obj = JSON.parse(responseText);
  // console.log(obj);

  // parseCategoryObject(obj);
  eventBus.emit('parse category obj', obj);
};

export const categoryGetFail = (responseText) => {
  console.log('category get fail');

  console.error(responseText);
};

export const categoryRequestFail = (responseText) => {
  console.log('category request fail', responseText);

  eventBus.emit('homepage state request');
};

export const categoryRequestSuccess = (responseText) => {
  // console.log('category request success', responseText);
  console.log('category request success');

  if (responseText === null) {
    console.error('category dont exist');
    return;
  }

  const obj = JSON.parse(responseText);

  console.log('category object', obj);
  eventBus.emit('render category prod array', obj);
};

export const categoryStateRequest = (name) => {
  console.log('categoryStateRequest', name);

  eventBus.emit('category state confirmed', name);

  showCategory(name);
};

export const categoryStateConfirmed = (name) => {
  eventBus.emit('category request', name);
};

export const categoryStateDenied = () => {
  console.log('category state denied');

  eventBus.emit('homepage state request');
};

export const cartDeleteRequest = (id) => {
  console.log('cart delete request', id);

  const obj = cart.getProduct(id);

  const temp = {};
  Object.assign(temp, obj);
  delete temp.price;

  console.log(temp);

  eventBus.emit('cart delete request', obj);
};

export const cartDeleteFail = (responseText) => {
  console.error('cart delete fail', responseText);
};

export const cartDeleteSuccess = (responseText) => {
  console.log('cart delete success', responseText);

  const obj = JSON.parse(responseText);

  cart.delete({
    id: obj.product_id,
    number: obj.number
  });
};

export const cartConfirmFail = (responseText) => {
  console.error('cart confirm error', responseText);
};

export const cartConfirmSuccess = (responseText) => {
  console.log('cart confirm success', responseText);
};

export const profileUploadFail = (responseText) => {
  console.error('profile upload fail', responseText);
};

export const profileUploadSuccess = (responseText) => {
  console.log('profile upload success', responseText);
};

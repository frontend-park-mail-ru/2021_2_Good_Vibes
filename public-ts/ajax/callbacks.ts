/* eslint-disable import/extensions */
import bus from '../init/bus';
import { AjaxResponse } from '../types';
import ajax from './script';

const backendAddress = 'https://ozonback.herokuapp.com';

export const signin = (data) => {
  console.log(data);
  ajax.post({
    url: `${backendAddress}/login`,
    body: data,
  })
    .then((response: AjaxResponse) => bus.emit('signIn ajax confirmed', response))
    .catch((response: AjaxResponse) => bus.emit('signIn ajax denied', response));
};

export const signup = (data) => {
  console.log(data);
  ajax.post({
    url: `${backendAddress}/signup`,
    body: data,
  })
    .then((response: AjaxResponse) => bus.emit('signUp ajax confirmed', response))
    .catch((response: AjaxResponse) => bus.emit('signUp ajax denied', response));
};

export const signout = () => {
  ajax.get({
    url: `${backendAddress}/logout`,
  })
    .then(() => bus.emit('signout confirmed', undefined))
    .catch((error) => console.error(error));
};

export const profile = () => {
  ajax.get({
    url: `${backendAddress}/profile`,
  })
    .then((response: AjaxResponse) => bus.emit('authorization', undefined))
    .catch((response: AjaxResponse) => bus.emit('no authorization', undefined));
};

export const cookieCheck = () => {
  ajax.get({
    url: `${backendAddress}/profile`,
  })
    .then((response: AjaxResponse) => bus.emit('cookie check success', response))
    .catch((response: AjaxResponse) => bus.emit('cookie check fail', response))
    .then(() => bus.emit('cookie check finished', undefined));
};

export const productAdd = () => {
  ajax.get({
    url: `${backendAddress}/product/add`,
  });
};

export const homepage = () => {
  ajax.get({
    url: `${backendAddress}/homepage`,
  })
    .then((response: AjaxResponse) => bus.emit('homepage ajax confirmed', response))
    .catch((error) => console.error(error));
};

export const product = (id) => {
  ajax.get({
    url: `${backendAddress}/product?id=${id}`,
  })
    .then(({ responseText }) => bus.emit('product request success', { responseText }))
    .catch(({ responseText }) => bus.emit('product request fail', { responseText }));
};

export const productArrayRequest = async (array) => {
  const result = [];

  array.forEach((element) => {
    ajax.get({
      url: `${backendAddress}/product?id=${element.product_id}`,
    })
      .then(({ responseText }) => JSON.parse(responseText))
      .then((obj) => {
        const tempObj = obj;
        tempObj.number = element.number;
        return tempObj;
      })
      .then((obj) => result.push(obj))
      .then(() => {
        if (result.length === array.length) {
          bus.emit('product array request success', result);
        }
      })
      .catch(({ responseText }) => bus.emit('product array request fail', responseText));
  });
};

export const order = () => {
  ajax.get({
    url: `${backendAddress}/cart/confirm`,
  })
    .then(({ responseText }) => bus.emit('order response', responseText))
    .catch((error) => console.error(error));
};

export const addProductToCart = (data) => {
  console.log('addProductToCart', data);

  const temp = {
    product_id: data.id,
    number: data.number,
  };

  console.log(temp);

  ajax.post({
    url: `${backendAddress}/cart/put`,
    body: temp,
  })
    .then(({ responseText }) => bus.emit('add product to cart success', { responseText }))
    .catch(({ responseText }) => bus.emit('add product to cart fail', { responseText }));
};

export const cartGet = () => {
  ajax.get({
    url: `${backendAddress}/cart/get`,
  })
    // .then(({ responseText }) => console.log(responseText))
    // .catch(({ responseText }) => console.log(responseText));
    .then(({ responseText }) => bus.emit('cart get confirmed', { responseText }))
    .catch(({ responseText }) => bus.emit('cart get denied', { responseText }))
    .then(() => bus.emit('cart get finished', undefined));
};


export const cartConfirm = (obj) => {
  // console.log(array);

  // const temp = {
  //   date: '2016-12-06 06:56:01',
  //   address: {
  //     country: 'country',
  //     region: 'region',
  //     city: 'city',
  //     street: 'street',
  //     house: 'house',
  //     flat: 'flat',
  //     index: 'index'
  //   },
  //   // cost: 213,
  //   products: array
  // };

  console.log('cart confirm', JSON.stringify(obj));

  ajax.post({
    url: `${backendAddress}/cart/confirm`,
    body: obj,
  })
    // .then(({ responseText }) => console.log({ responseText }))
    // .catch(({ responseText }) => console.log({ responseText }));
    .then(({ responseText }) => bus.emit('cart confirm success', responseText))
    .catch(({ responseText }) => bus.emit('cart comfirm fail', responseText));
};

export const avatarUpload = (file: File) => {
  // console.log('avatar upload');

  ajax.avatarUpload({
    method: 'POST',
    url: `${backendAddress}/upload/avatar`,
    file,
    callback: (status, responseText) => {
      if (status < 300) {
        bus.emit('avatar upload success', { responseText });
        return;
      }
      bus.emit('avatar upload fail', { responseText });
    },
  });
};

export const categoryGet = () => {
  console.log('category get');

  ajax.get({
    url: `${backendAddress}/category`,
  })
    // .then(({ responseText }) => console.log(responseText))
    // .catch(({ responseText }) => console.log(responseText));

    .then(({ responseText }) => bus.emit('category get success', responseText))
    .catch(({ responseText }) => bus.emit('category get fail', responseText))
    .then(() => bus.emit('category get finished', undefined));
};

export const categoryRequest = (name) => {
  console.log('categoryRequest', name);

  ajax.get({
    url: `${backendAddress}/category/${name}`,
  })
    // .then(({ responseText }) => console.log(responseText))
    // .catch(({ responseText }) => console.log(responseText));

    .then(({ responseText }) => bus.emit('category request success', responseText))
    .catch(({ responseText }) => bus.emit('category request fail', responseText));
};

export const cartDelete = (obj) => {
  console.log('cart delete', obj);

  ajax.post({
    url: `${backendAddress}/cart/delete`,
    body: obj,
  })
    .then(({ responseText }) => bus.emit('cart delete success', responseText))
    .catch(({ responseText }) => bus.emit('cart delete fail', responseText));
};

export const profileUpload = (obj) => {
  console.log('profile upload', obj);

  ajax.post({
    url: `${backendAddress}/profile`,
    body: obj,
  })
    .then(({ responseText }) => bus.emit('profile upload success', responseText))
    .catch(({ responseText }) => bus.emit('profile upload fail', responseText));
};

/* eslint-disable import/extensions */
import eventBus from '../scripts/eventBus.js';
import ajax from './script.js';

const backendAddress = 'https://ozonback.herokuapp.com';

export const signin = (data) => {
  console.log(data);
  ajax.post({
    url: `${backendAddress}/login`,
    body: data
  })
    .then(({ responseText }) => eventBus.emit('signin success', responseText))
    .catch(({ responseText }) => eventBus.emit('signin fail', responseText));
};

export const signup = (data) => {
  console.log(data);
  ajax.post({
    url: `${backendAddress}/signup`,
    body: data
  })
    .then(({ responseText }) => eventBus.emit('signup success', responseText))
    .catch(({ responseText }) => eventBus.emit('signup fail', responseText));
};

export const signout = () => {
  ajax.get({
    url: `${backendAddress}/logout`
  })
    .then(() => eventBus.emit('logout success'))
    .catch((error) => console.error(error));
};

export const profile = () => {
  ajax.get({
    url: `${backendAddress}/profile`
  })
    .then(() => eventBus.emit('authorization'))
    .catch(() => eventBus.emit('no authorization'));
};

export const cookieCheck = () => {
  ajax.get({
    url: `${backendAddress}/profile`
  })
    .then(({ responseText }) => eventBus.emit('cookie check success', responseText))
    .catch(({ responseText }) => eventBus.emit('cookie check fail', responseText))
  // .then(() => eventBus.emit('cookie check finished'));
};

export const productAdd = () => {
  ajax.get({
    url: `${backendAddress}/product/add`
  })
}

export const homepage = () => {
  ajax.get({
    url: `${backendAddress}/homepage`
  })
    .then(({ responseText }) => eventBus.emit('homepage response', responseText))
    .catch((error) => console.error(error));
};

export const product = (id) => {
  ajax.get({
    url: `${backendAddress}/product?id=${id}`
  })
    .then(({ responseText }) => eventBus.emit('product request success', { responseText }))
    .catch(({ responseText }) => eventBus.emit('product request fail', { responseText }));
};

export const productArrayRequest = async (array) => {
  const result = [];

  array.forEach((element) => {
    ajax.get({
      url: `${backendAddress}/product?id=${element.product_id}`
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
          eventBus.emit('product array request success', result);
        }
      })
      .catch(({ responseText }) => eventBus.emit('product array request fail', responseText));
  });
};

export const order = () => {
  ajax.get({
    url: `${backendAddress}/cart/confirm`
  })
    .then(({ responseText }) => eventBus.emit('order response', responseText))
    .catch((error) => console.error(error));
};

export const addProductToCart = (data) => {
  console.log('addProductToCart', data);

  const temp = {
    product_id: data.id,
    number: data.number
  };

  console.log(temp);

  ajax.post({
    url: `${backendAddress}/cart/put`,
    body: temp
  })
    .then(({ responseText }) => eventBus.emit('add product to cart success', { responseText }))
    .catch(({ responseText }) => eventBus.emit('add product to cart fail', { responseText }));
};

export const cartGet = () => {
  ajax.get({
    url: `${backendAddress}/cart/get`
  })
    // .then(({ responseText }) => console.log(responseText))
    // .catch(({ responseText }) => console.log(responseText));
    .then(({ responseText }) => eventBus.emit('cart get success', { responseText }))
    .catch(({ responseText }) => eventBus.emit('cart get fail', { responseText }));
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
    body: obj
  })
    // .then(({ responseText }) => console.log({ responseText }))
    // .catch(({ responseText }) => console.log({ responseText }));
    .then(({ responseText }) => eventBus.emit('cart confirm success', responseText))
    .catch(({ responseText }) => eventBus.emit('cart comfirm fail', responseText));
};

export const avatarUpload = (file) => {
  // console.log('avatar upload');

  ajax.avatarUpload({
    method: 'POST',
    url: `${backendAddress}/upload/avatar`,
    file,
    callback: (status, responseText) => {
      if (status < 300) {
        eventBus.emit('avatar upload success', responseText);
        return;
      }
      eventBus.emit('avatar upload fail', responseText);
    }
  });
};

export const categoryGet = () => {
  console.log('category get');

  ajax.get({
    url: `${backendAddress}/category`
  })
    // .then(({ responseText }) => console.log(responseText))
    // .catch(({ responseText }) => console.log(responseText));

    .then(({ responseText }) => eventBus.emit('category get success', responseText))
    .catch(({ responseText }) => eventBus.emit('category get fail', responseText));
};

export const categoryRequest = (name) => {
  console.log('categoryRequest', name);

  ajax.get({
    url: `${backendAddress}/category/${name}`
  })
    // .then(({ responseText }) => console.log(responseText))
    // .catch(({ responseText }) => console.log(responseText));

    .then(({ responseText }) => eventBus.emit('category request success', responseText))
    .catch(({ responseText }) => eventBus.emit('category request fail', responseText));
};

export const cartDelete = (obj) => {
  console.log('cart delete', obj);

  ajax.post({
    url: `${backendAddress}/cart/delete`,
    body: obj
  })
    .then(({ responseText }) => eventBus.emit('cart delete success', responseText))
    .catch(({ responseText }) => eventBus.emit('cart delete fail', responseText));
};

export const profileUpload = (obj) => {
  console.log('profile upload', obj);

  ajax.post({
    url: `${backendAddress}/profile`,
    body: obj
  })
    .then(({ responseText }) => eventBus.emit('profile upload success', responseText))
    .catch(({ responseText }) => eventBus.emit('profile upload fail', responseText));
}
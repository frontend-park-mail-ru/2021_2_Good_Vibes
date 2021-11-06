/* eslint-disable import/extensions */
import state from '../viewDispatcher/states.js';
import eventBus from '../scripts/eventBus.js';
import ProductCard from '../productCard/view.js';

// ----------------------------------
let prodList = {};

const add = (obj) => {
  prodList = Object.assign(prodList, obj);
};

const remove = (name) => {
  prodList[name].delete();
  delete prodList[name];
};

// ----------------------------------
export const renderProdCard = (prodData) => {
  if (prodList[prodData.id]) {
    return;
  }

  const root = document.getElementsByClassName('product-container')[0];
  const prodCard = document.createElement('div');
  prodCard.className = 'product-card';
  const prodObj = new ProductCard(prodCard);

  add({
    [prodData.id]: {
      element: prodCard,
      object: prodObj,
      state: state.hidden
    }
  });

  prodObj.setContext(prodData);
  prodList[prodData.id].state = state.visible;
  root.appendChild(prodCard);

  prodObj.render()
    .catch((error) => console.error(error));
};

// ----------------------------------
export const renderProdArray = (prodArray) => {
  if (!Array.isArray(prodArray)) {
    console.error('wrong prodArray');
    return;
  }

  prodArray.forEach((item) => {
    renderProdCard(item);
  });
};

// ----------------------------------
export const homepageLoaded = (responseText) => {
  console.log('homepageLoaded');

  console.log(responseText);

  try {
    const prodArray = JSON.parse(responseText);
    renderProdArray(prodArray);

    eventBus.emit('showView', {
      name: 'Homepage'
    });

  } catch {
    console.error();
  }

  // eventBus.emit('homepage ajax request');
};


// ----------------------------------
export const homepageResponse = (responseText) => {
  const prodArray = JSON.parse(responseText);
  renderProdArray(prodArray);
};
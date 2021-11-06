/* eslint-disable import/extensions */
import eventBus from '../scripts/eventBus.js';
import ItemCart from '../itemCart/view.js';
import state from '../viewDispatcher/states.js';
import cart from '../objects/cart.js';

export const showOrder = () => {
  eventBus.emit('showView', {
    name: 'Order'
  });
};

let itemList = {};

const add = (obj) => {
  itemList = Object.assign(itemList, obj);
};

const remove = (name) => {
  itemList[name].element.remove();
  delete itemList[name];
};

export const renderItemCart = (itemData) => {
  // console.log('renderItemCart', itemData);

  // if (itemList[itemData.id]) {
  //   return;
  // }


  const root = document.getElementsByClassName('items')[0];

  const temp = itemList[itemData.id];
  console.log(temp);
  if (temp) {
    root.appendChild(temp.element);
    return;
  }

  const itemCart = document.createElement('li');
  // itemCart.className = 'content cart';
  const itemObj = new ItemCart(itemCart);

  add({
    [itemData.id]: {
      element: itemCart,
      object: itemObj,
      state: state.hidden
    }
  });

  itemObj.setContext(itemData);
  itemList[itemData.id].state = state.visible;
  root.appendChild(itemCart);

  itemObj.render()
    .catch((error) => console.error(error));
};

export const renderItemArray = (itemArray) => {
  // console.log('renderItemArray', itemArray);

  // const array = Object.assign({}, itemArray);

  // const array = itemArray.slice();


  if (!Array.isArray(itemArray)) {
    console.error('wrong itemArray');
    return;
  }

  itemArray.forEach((element) => {
    // console.log('renderItemArray', element);

    cart.setItemPrice({
      id: element.id,
      price: element.price
    });
    renderItemCart(element);

    // console.log('!renderItemArray', element);
  });

  // console.log(array);
};


export const cartpageLoaded = (responseText) => {
  console.log('cartpageLoaded');

  // console.log('!!!', responseText);

  try {
    const itemArray = JSON.parse(responseText);
    renderItemArray(itemArray);

    eventBus.emit('showView', {
      name: 'Cart'
    });

  } catch {
    console.error();
  }
};

export const cartpageResponse = (responseText) => {
  // console.log('!!!', responseText);
  const itemArray = JSON.parse(responseText);
  renderItemArray(itemArray);
};

export const localCartResponse = () => {
  console.log(cart.getCartItems());
  renderItemArray(cart.getCartItems());
};

export const addProductArray = (array) => {
  // console.log('addProductArray', array);
  renderItemArray(array);

  eventBus.emit('calculate subtotal');
};

// export const clean = () => {
//   const cartList = document.getElementsByClassName('cart-list')[0];

//   cartList.innerHTML = '';
// };

export const deleteItem = (responseText) => {
  console.log('delete item');

  const obj = JSON.parse(responseText);

  console.log(obj);

  remove(obj.product_id);
  eventBus.emit('calculate subtotal');
};

export const deleteAllItems = () => {
  console.log('deleteAllItems');

  console.log(cart.get());
  cart.get().forEach((element) => {
    console.log(element);
    remove(element.product_id);
  });
  cart.drop();

  eventBus.emit('calculate subtotal');
};

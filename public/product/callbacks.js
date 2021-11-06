/* eslint-disable import/extensions */
import eventBus from '../scripts/eventBus.js';
import cart from '../objects/cart.js';
/*import { response } from 'express';*/

/* export const showCart = () => {
  eventBus.emit('profile ajax request');
}; */

// export const addToCart = (responseText) => {
//   try {
//     let cartItems = cart.getCartItems();

//     const existItem = cartItems.find((x) => x.id === responseText.id);
//     if (existItem) {
//       cartItems = cartItems.map((x) =>
//         x.id === existItem.id ? responseText : x
//       );
//     } else {
//       cartItems = [...cartItems, responseText];
//     }
//     cart.setCartItems(cartItems);
//     console.log(cart.getCartItems().length);
//   } catch (error) {
//     console.error(error);
//   }
// };

export const addToCart = (responseText) => {
  // try {
  //   let cartItems = cart.getCartItems();

  //   const existItem = cartItems.find((x) => x.id === responseText.id);
  //   if (existItem) {
  //     cartItems = cartItems.map((x) =>
  //       x.id === existItem.id ? responseText : x
  //     );
  //   } else {
  //     cartItems = [...cartItems, responseText];
  //   }
  //   cart.setCartItems(cartItems);
  //   console.log(cart.getCartItems().length);
  // } catch (error) {
  //   console.error(error);
  // }

  // cart.add({
  //   id: responseText.id,
  //   number: 1
  // });

  cart.add({
    id: responseText.id,
    number: 1
  });

  console.log(JSON.stringify(cart.show()));
};


export const request = () => {
  eventBus.emit('product ajax request');
};

// export const showContext = () => {

// };

export const productContextRequest = () => {
  eventBus.emit('product context request');
};

export const addToCartRequest = (responseObj) => {
  // console.log('addToCartRequest', responseObj);

  const currentNumber = cart.getProduct(responseObj.id)?.number || 0;

  const data = {
    id: responseObj.id,
    number: currentNumber + 1
  };

  eventBus.emit('add product to cart request', data);
};

export const homepageStateRequest = () => {
  eventBus.emit('homepage state request');
};

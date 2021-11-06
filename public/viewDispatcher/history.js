/* eslint-disable import/extensions */
import eventBus from '../scripts/eventBus.js';

export const add = (path) => {
  eventBus.emit('history add', path);
};

// export const addProduct = (responseText) => {
//   console.log(JSON.parse(responseText));
//   const { id } = JSON.parse(responseText);
//   eventBus.emit('history add', `product?id=${id}`);
//   console.log(id);
// };

export const addProduct = (id) => {
  eventBus.emit('history add', `product?id=${id}`);
};

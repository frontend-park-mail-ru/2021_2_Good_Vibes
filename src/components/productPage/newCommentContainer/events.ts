import bus from '../../../init/bus';
import { Product } from '../../../types';

const initEvents: (self: HTMLElement) => void = (self) => {
  // ---------------------------
  const addCommentBtn = <HTMLButtonElement>self.getElementsByClassName('add-comment-btn')[0];
  // addCommentBtn.addEventListener('click', () => {
  //   bus.emit('add comment button click', undefined);
  // });

  self.addEventListener('submit', (event) => {
    event.preventDefault();

    bus.emit('add comment button click', undefined);
  });
};

export default initEvents;

import bus from '../../init/bus';

const initEvents: (self: HTMLElement) => void = (self) => {
  // -------------------------
/*   const closeBtn = <HTMLElement>self.getElementsByClassName('aside-container_close-button')[0];
  closeBtn.addEventListener('click', (event) => {
    event.preventDefault();

    bus.emit('hide aside', undefined);
  });
 */
  // -------------------------
  const category = <HTMLElement>self.getElementsByClassName('categories')[0];
  category.addEventListener('click', (event) => {
    event.preventDefault();

    bus.emit('show subcategory', undefined);
  });
};

export default initEvents;

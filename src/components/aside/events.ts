import bus from '../../init/bus';

const initEvents: (self: HTMLElement) => void = (self) => {
  // -------------------------
  /* const closeBtn = document.getElementsByClassName('burger-close')[0];
  console.log('close', closeBtn);
   closeBtn.addEventListener('click', (event) => {
   event.preventDefault();

   bus.emit('hide aside by button', undefined);
 }); */

  // -------------------------
  const category = <HTMLElement>self.getElementsByClassName('categories')[0];
  category.addEventListener('click', (event) => {
    event.preventDefault();

    bus.emit('show subcategory', undefined);
  });

const closeBtn = <HTMLElement>self.getElementsByClassName('menu-burger__close')[0];
  closeBtn.addEventListener('click', (event) => {
    event.preventDefault();

    bus.emit('hide aside by button', undefined);
  });
};

export default initEvents;

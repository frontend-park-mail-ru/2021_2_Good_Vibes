import bus from '../../modules/bus/bus';
import { Product, ProductId } from '../../types';

// const initEvents: (self: HTMLElement, context: Product) => void = (self, context) => {
const initEvents: (self: HTMLElement, { context, img }: { context: Product, img: string[] }) => void = (self, { context, img }) => {

  // debugger;

  // ------------------
  const backBtn = <HTMLAnchorElement>self.getElementsByClassName('back-to-result__link')[0];
  backBtn.addEventListener('click', (event) => {
    event.preventDefault();

    bus.emit('back to result button click', undefined);
  });

  // ------------------
  const addBtn = <HTMLButtonElement>self.getElementsByClassName('info-card-btn__cart')[0];
  addBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const { id } = context;

    bus.emit('add product to cart', { id, number: 1 });
  });

  const addBtnMobile = <HTMLButtonElement>self.getElementsByClassName('info-card-mobile-btn__cart')[0];
  addBtnMobile.addEventListener('click', (event) => {
    event.preventDefault();

    const { id } = context;

    bus.emit('add product to cart mobile', { id, number: 1 });
  });

  const addBtnAddFavorite = <HTMLButtonElement>self.getElementsByClassName('flagIsFavorite_false')[0];
  addBtnAddFavorite?.addEventListener('click', (event) => {
    event.preventDefault();

    const { id } = context;
    bus.emit('add product to favorite', { id });
  });

  const addBtnDelFavorite = <HTMLButtonElement>self.getElementsByClassName('flagIsFavorite_true')[0];
  addBtnDelFavorite?.addEventListener('click', (event) => {
    event.preventDefault();

    const { id } = context;

    bus.emit('del product from favorite', { id });
  });
};

export default initEvents;

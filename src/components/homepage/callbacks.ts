import { Callback, Product } from '../../types';
import ProductCatdList from '../productCard/list';

let pageYOffset: number;

export const addProductArray: Callback = (array: Product[]) => {
  const productContainer = document.getElementById('product-table-body');
  productContainer.textContent = '';

  array.sort((a, b) => a.id - b.id);

  const viewArray = ProductCatdList.viewArray(array);
  viewArray.forEach((cardView) => {
    productContainer.appendChild(cardView.self);
  });
};

export const addProductArrayRec: Callback = (array: Product[]) => {
  const productContainer = document.getElementById('product-table-bodytrends');
  /* productContainer.textContent = '';

  array.sort((a, b) => a.id - b.id); */

  const viewArray = ProductCatdList.viewArray(array);
  viewArray?.forEach((cardView) => {
    productContainer.appendChild(cardView.self);
  });
};

export const savePageYOffset: Callback = () => {
  pageYOffset = window.pageYOffset;
};

export const scrollToPageYOffset: Callback = () => {
  document.documentElement.scrollTop = pageYOffset || 0;
};
/*
const hideSignInContent: Callback = () => {
  const target = <HTMLElement>document.getElementById('product-table-bodytrends');
  target.style.display = 'none';
};

const showSignInContent: Callback = () => {
  const target = <HTMLElement>document.getElementById('product-table-bodytrends');
  target.style.display = 'flex';
};

export const authorizeContentHandle: Callback = () => {
  if (user.isAutorize()) {
    showSignInContent(undefined);
    return;
  }

  hideSignInContent(undefined);
}; */
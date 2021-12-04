import {
  Callback,
  Product,
} from '../../types';
import ProductCatdList from '../productCard/list';
import categoryList from '../../object/category/list';

let categoryName: string;

const pageYOffset: { [name: string]: number } = {};

export const addProductArray: Callback = (array: Product[]) => {
  /* const productContainer = document.getElementsByClassName('product-container')[0]; */
  const productContainer = document.getElementsByClassName('product-table-body')[0];

  productContainer.textContent = '';

  if (!array) {
    productContainer.appendChild(document.createTextNode('Нет товаров в этой категории'));
    return;
  }

  // array.sort((a, b) => a.id - b.id);

  const viewArray = ProductCatdList.viewArray(array);
  viewArray.forEach((cardView) => {
    productContainer.appendChild(cardView.self);
  });
};

export const saveCurrentCategoryName: Callback = () => {
  const { search } = window.location;
  [, categoryName] = search.match(/.*name=(\w+)/u);
};

export const savePageYOffset: Callback = () => {
  pageYOffset[categoryName] = window.pageYOffset;
};

export const scrollToPageYOffset: Callback = () => {
  document.documentElement.scrollTop = pageYOffset[categoryName] || 0;
};

export const changeCategoryName: Callback = () => {
  const name = <HTMLElement>document.getElementsByClassName('product-table__title')[0];
  name.textContent = categoryList[categoryName];
};

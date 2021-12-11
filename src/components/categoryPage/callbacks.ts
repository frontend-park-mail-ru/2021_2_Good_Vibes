import {
  Callback,
  Product,
} from '../../types';
import ProductCatdList from '../productCard/list';
import categoryList from '../../services/category/list';

let categoryName: string;

const pageYOffset: { [name: string]: number } = {};

const gen = function* (productArray: Product[]) {
  const chankLength = 6;

  const a: Product[] = [];
  let i: number;
  for (i = 0; i < Math.floor(productArray.length / chankLength); i += 1) {
    yield productArray.slice(i * chankLength, (i + 1) * chankLength);
  }
  yield productArray.slice(i * chankLength, productArray.length);

  return a;
};

let generator: Generator<Product[], Product[], unknown>;

export const renderArray: Callback = () => {
  const a = generator.next();

  if (a.done) {
    return;
  }

  // console.log(a);

  const productContainer = document.getElementsByClassName('product-table-body')[0];

  const viewArray = ProductCatdList.viewArray(a.value);

  viewArray.forEach((cardView) => {
    productContainer.appendChild(cardView.self);
  });
};

export const createChankGenerator: Callback = (array: Product[]) => {
  const productContainer = document.getElementsByClassName('product-table-body')[0];

  productContainer.textContent = '';

  if (!array) {
    productContainer.appendChild(document.createTextNode('Нет товаров в этой категории'));
    return;
  }

  generator = gen(array);

  // renderArray(undefined);
  // renderArray();
  // renderArray();
  // renderArray();
  // renderArray();
  // renderArray();
};

export const saveCurrentCategoryName: Callback = () => {
  const { search } = window.location;

  console.log('saveCurrentCategoryName', search, window.location.pathname);
  // [, categoryName] = search.match(/.*name=(\w+)/u);

  [, categoryName] = window.location.pathname.match(/\/category\/(.+)/u);
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

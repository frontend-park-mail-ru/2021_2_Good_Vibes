
import { Callback, Brand } from '../../types';
import BrandCardList from '../brandCard/list';
import Brands from './view';

export const addProductBrandNew: Callback = (array: Brand[]) => {
  const productContainer = document.getElementsByClassName('product-table-body')[0];
  /* productContainer.textContent = '';
 
  array.sort((a, b) => a.id - b.id); */
  const viewArray = BrandCardList.viewArray(array);

  viewArray?.forEach((cardView) => {
    // console.log(cardView.self);
    productContainer.appendChild(cardView?.self);
  });
};


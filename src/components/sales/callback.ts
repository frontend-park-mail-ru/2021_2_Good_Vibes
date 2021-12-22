
import { Callback, Product } from '../../types';
import ProductCatdList from '../productCard/list';

export const addProductArraySales: Callback = (array: Product[]) => {
    const productContainer = document.getElementById('product-table-body');
    
    const viewArray = ProductCatdList.viewArray(array);
    viewArray?.forEach((cardView) => {
      productContainer.appendChild(cardView?.self);
    });
  };
  
 
import { Callback, Product } from "../../types";
import ProductCatdList from "../productCard/list";
import user from "../../services/user/user";

export const addProductArrayFavorite: Callback = (array: Product[]) => {
  const productContainer = document.getElementById("product-table-body");
  /* productContainer.textContent = '';
  array.sort((a, b) => a.id - b.id); */

  productContainer.textContent = "";
  const viewArray = ProductCatdList.viewArray(array);
  viewArray?.forEach((cardView) => {
    productContainer.appendChild(cardView?.self);
  });
};

export const fieldsFill: Callback = () => {
  const userName = <HTMLImageElement>document.getElementsByClassName("b2n")[0];

  userName.textContent = user.username;
};

export const showAvatar: Callback = () => {
  const photo = <HTMLImageElement>document.getElementsByClassName("b2m5")[0];
  photo.style.backgroundImage = `url(${user.avatar})`;
};

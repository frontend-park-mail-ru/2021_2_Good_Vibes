import bus from "../../modules/bus/bus";
import { Callback } from "../../types";
import redirect from "../../dispatcher/redirect";

export const homepageStateRequest: Callback = () => {
  bus.emit("homepage state request", undefined);
};

export const profileStateRequest: Callback = () => {
  bus.emit("profile state request", undefined);
};

export const cartStateRequest: Callback = () => {
  bus.emit("cart state request", undefined);
};

export const favoriteStateRequest: Callback = () => {
  bus.emit("favorite state request", undefined);
};

export const brandsStateRequest: Callback = () => {
  bus.emit("brands state request", undefined);
};

export const newestStateRequest: Callback = () => {
  bus.emit("newest state request", undefined);
};

export const salesStateRequest: Callback = () => {
  bus.emit("sales state request", undefined);
};

export const ordersStateRequest: Callback = () => {
  bus.emit("orders state request", undefined);
}

export const reviewsStateRequest: Callback = () => {
  bus.emit("reviews state request", undefined);
}

export const showAside: Callback = () => {
  bus.emit("show aside", undefined);
};

export const hideAsideByBtn: Callback = () => {
  bus.emit("hide aside by button", undefined);
};

export const showProfileMenu: Callback = () => {
  const menu = document.getElementsByClassName("header-dropdown")[0];
  menu.classList.add('shown');
}

export const hideProfileMenu: Callback = () => {
  const menu = document.getElementsByClassName("header-dropdown")[0];
  menu.classList.remove('shown');
}

// export const saveState: Callback = (obj: { state: string }) => {
//   redirect.saveState(obj);
// };

export const showSearch: Callback = () => {
  /* console.log('booody');
  const bodyElem = document.getElementsByClassName('body')[0];
  const popUpElem = document.createElement('div');
  popUpElem.className = 'popup-search';
  bodyElem.appendChild(popUpElem);
  console.log('body', bodyElem); */
  const search = document.getElementsByClassName('popup-search')[0];
  search.classList.add('shown');
};

export const signOutRequest: Callback = () => {
  bus.emit("signout ajax request", undefined);
};
import { debug } from "console";
import bus from "../../modules/bus/bus";
import user from "../../services/user/user";
import { Callback, Order } from "../../types";

export const signOutRequest: Callback = () => {
  bus.emit("signout ajax request", undefined);
};

export const fieldsFill: Callback = () => {
  const loginInput = <HTMLInputElement>(
    document.getElementsByClassName("user-box__login")[0]
  );
  const emailInput = <HTMLInputElement>(
    document.getElementsByClassName("user-box__email")[0]
  );
  const photo = <HTMLImageElement>(
    document.getElementsByClassName("b2m5")[0]
  );

  const userName = <HTMLImageElement>(
    document.getElementsByClassName("b2n")[0]
  );

  userName.textContent = user.username;
  loginInput.value = user.username;
  emailInput.value = user.email;
  photo.style.backgroundImage = `url(${user.avatar})`;
};

export const profileUploadRequest: Callback = () => {

  const loginInput = <HTMLInputElement>(
    document.getElementsByClassName("user-box__login")[0]
  );
  const emailInput = <HTMLInputElement>(
    document.getElementsByClassName("user-box__email")[0]
  );
  const realNameInput = <HTMLInputElement>(
    document.getElementsByClassName("user-box__firstname")[0]
  );
  const realSurnameInput = <HTMLInputElement>(
    document.getElementsByClassName("user-box__secondname")[0]
  );
  const obj = {
    username: loginInput.value.trim(),
    email: emailInput.value.trim(),
    realName: realNameInput.value.trim(),
    realSurnameInput: realSurnameInput.value.trim(),
  };

  bus.emit("profile upload request", obj);
};

export const avatarUploadRequest: Callback = () => {
  const file = <HTMLInputElement>(
    document.getElementsByClassName("uploadFile")[0]
  );
  const choosedFile = file.files[0];

  console.log("update img");

  if (choosedFile) {
    bus.emit("avatar upload request", choosedFile);
  }
};

export const ordersListRequest: Callback = () => {
  bus.emit("orders list request", undefined);
};

export const ordersStateRequest: Callback = () => {
  bus.emit("orders state request", undefined);
};

export const changeInfo: Callback = () => {
  const input = document.querySelectorAll('.user-box__input');
  input.forEach((item) => {
    item.removeAttribute('readonly');
    item.removeAttribute('disabled');
  })
  const updateBtn = <HTMLElement>(document.getElementsByClassName('update-btn')[0]);
  updateBtn.style.display = 'block';
}

export const changeInfoDisabled: Callback = () => {
  const input = document.querySelectorAll('.user-box__input');
  input.forEach((item) => {
    item.setAttribute('readonly', 'true');
    item.setAttribute('disabled', 'true');
  })
  const updateBtn = <HTMLElement>(document.getElementsByClassName('update-btn')[0]);
  updateBtn.style.display = 'none';
}

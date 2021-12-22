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
  const realNameInput = <HTMLInputElement>(
    document.getElementsByClassName("user-box__firstname")[0]
  );
  const realSurnameInput = <HTMLInputElement>(
    document.getElementsByClassName("user-box__secondname")[0]
  );
  const birthdayInput = <HTMLInputElement>(
    document.getElementsByClassName("user-box__birthday")[0]
  );
  const sexInput = <HTMLInputElement>(
    document.getElementsByClassName("user-box__sex")[0]
  );

  birthdayInput.valueAsDate = new Date(user.birth_day);

  userName.textContent = user.username;
  loginInput.value = user.username;

  realNameInput.value = '';
  realSurnameInput.value = '';
  sexInput.value = '';

  if (user.real_name) {
    realNameInput.value = user.real_name;
  }

  if (user.real_surname) {
    realSurnameInput.value = user.real_surname;
  }

  if (user.sex) {
    sexInput.value = user.sex;
  }

  photo.style.backgroundImage = `url(${user.avatar})`;
  emailInput.value = user.email;
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
  const birthdayInput = <HTMLInputElement>(
    document.getElementsByClassName("user-box__birthday")[0]
  );
  const sexInput = <HTMLInputElement>(
    document.getElementsByClassName("user-box__sex")[0]
  );
  const obj = {
    username: loginInput.value.trim(),
    email: emailInput.value.trim(),
    real_name: realNameInput.value.trim(),
    real_surname: realSurnameInput.value.trim(),
    sex: sexInput.value.trim(),
    birth_day: birthdayInput.value.trim(),
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
};

export const handleUpdateConfirmed: Callback = (obj) => {
  const updateLabel = <HTMLLabelElement>document.getElementsByClassName('profile-update-alert-label')[0];

  updateLabel.textContent = 'Данные обновлены!';
  updateLabel.style.visibility = 'visible';
  // console.warn('handleUpdateConfirmed', obj);

};

export const hideAlert: Callback = () => {
  const updateLabel = <HTMLLabelElement>document.getElementsByClassName('profile-update-alert-label')[0];
  updateLabel.style.visibility = 'hidden';
}
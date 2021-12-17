import bus from "../../modules/bus/bus";
import user from "../../services/user/user";
import { Callback, Order } from "../../types";

export const signOutRequest: Callback = () => {
  bus.emit("signout ajax request", undefined);
};

export const fieldsFill: Callback = () => {
  // const loginInput = <HTMLInputElement>document.getElementsByClassName('form__login')[0];
  // const emailInput = <HTMLInputElement>document.getElementsByClassName('form__email')[0];
  // const photo = <HTMLImageElement>document.getElementsByClassName('form__photo')[0];

  // loginInput.value = user.username;
  // emailInput.value = user.email;
  // photo.src = user.avatar;

  const loginInput = <HTMLInputElement>(
    document.getElementsByClassName("user-box__login")[0]
  );
  const emailInput = <HTMLInputElement>(
    document.getElementsByClassName("user-box__email")[0]
  );
  const photo = <HTMLImageElement>(
    document.getElementsByClassName("form__photo")[0]
  );

  loginInput.value = user.username;
  emailInput.value = user.email;
  photo.src = user.avatar;

  /* const file = <HTMLInputElement>document.getElementsByClassName('form__uploadFile')[0];
  file.style.display = 'none';  */
};

export const profileUploadRequest: Callback = () => {
  // const usernameInput = <HTMLInputElement>document.getElementsByClassName('form__login')[0];
  // const emailInput = <HTMLInputElement>document.getElementsByClassName('form__email')[0];

  // const obj = {
  //   username: usernameInput.value.trim(),
  //   email: emailInput.value.trim(),
  // };

  // bus.emit('profile upload request', obj);

  const loginInput = <HTMLInputElement>(
    document.getElementsByClassName("user-box__login")[0]
  );
  const emailInput = <HTMLInputElement>(
    document.getElementsByClassName("user-box__email")[0]
  );
  const obj = {
    username: loginInput.value.trim(),
    email: emailInput.value.trim(),
  };

  bus.emit("profile upload request", obj);
};

export const avatarUploadRequest: Callback = () => {
  const file = <HTMLInputElement>(
    document.getElementsByClassName("form__uploadFile")[0]
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

export const parseResponse: Callback = (obj: { responseText: string }) => {
  const { responseText } = obj;
  Promise.resolve()
    .then(() => JSON.parse(responseText))
    .then((parsedObj: Order[]) => bus.emit("show orders list", parsedObj))
    .catch((err) => console.error(err));
};

export const showOrderList: Callback = (obj: Order[]) => {
  const oldTbody = <HTMLTableRowElement>(
    document.getElementsByClassName("table-body")[0]
  );
  if (oldTbody) {
    oldTbody.remove();
  }

  const tbody = <HTMLTableSectionElement>document.createElement("tbody");
  tbody.className = "table-body";

  obj?.forEach((item) => {
    const tr = <HTMLTableRowElement>document.createElement("tr");

    const orderIdCell = <HTMLTableCellElement>document.createElement("td");
    orderIdCell.textContent = item.order_id.toString();
    tr.appendChild(orderIdCell);

    const costCell = <HTMLTableCellElement>document.createElement("td");
    costCell.textContent = item.cost.toString();
    tr.appendChild(costCell);

    /* const payStatusCell = <HTMLTableCellElement>document.createElement('td');
    payStatusCell.textContent = '[тут пока пусто]';
    tr.appendChild(payStatusCell); */

    /*    const deliveryStatusCell = <HTMLTableCellElement>document.createElement('td');
    deliveryStatusCell.textContent = item.status;
    tr.appendChild(deliveryStatusCell); */

    const dateCell = <HTMLTableCellElement>document.createElement("td");
    const date = new Date(item.date);
    // console.log(a.toLocaleDateString(), a.toLocaleTimeString());
    dateCell.textContent = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

    tr.appendChild(dateCell);

    /*  const detalesCell = <HTMLTableCellElement>document.createElement('td');
    detalesCell.innerHTML = '<a href="/#/order/"> Детали </a>';
    tr.appendChild(detalesCell);
    */

    tbody.appendChild(tr);
  });

  const table = <HTMLTableElement>(
    document.getElementsByClassName("my_account_orders")[0]
  );
  table.appendChild(tbody);
};

export const ordersStateRequest: Callback = () => {
  bus.emit("orders state request", undefined);
};

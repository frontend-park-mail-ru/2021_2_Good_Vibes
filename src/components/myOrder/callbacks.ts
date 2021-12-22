import { orders } from "../../dispatcher/request/callbacks";
import bus from "../../modules/bus/bus";
import user from "../../services/user/user";
import { Callback, Order } from "../../types";
import OrdersContainer from "./ordersContainer/view";

export const ordersListRequest: Callback = () => {
  bus.emit("orders list request", undefined);
};

const viewList: { [id: number]: OrdersContainer } = {};

export const cleanOrderContainer: Callback = () => {
  const orderList = <HTMLElement>(
    document.getElementsByClassName("orders-container")[0]
  );
  // orderList.textContent = '';
  orderList.innerHTML =
    '<h3 class="loading-order-list-text">Загружается список товаров. Пожалуйста, подождите...</h3>';

  Object.keys(viewList).forEach((key) => {
    delete viewList[key];
  });
};

export const parseResponse: Callback = (obj: { responseText: string }) => {
  const { responseText } = obj;
  Promise.resolve()
    .then(() => JSON.parse(responseText))
    .then((parsedObj: Order[]) => bus.emit("show orders list", parsedObj))
    .catch((err) => console.error(err));
};

export const showOrderList: Callback = (obj: Order[]) => {
  const orderList = <HTMLElement>(
    document.getElementsByClassName("orders-container")[0]
  );
  orderList.textContent = "";

  if (obj.length === 0) {
    const noOrdersLabel = document.createElement("h3");
    noOrdersLabel.textContent = "Вы еще не сделали никаких заказов";
    orderList.appendChild(noOrdersLabel);

    return;
  }

  const objKeys = obj.map((order) => order.order_id);
  Object.keys(viewList).forEach((key) => {
    if (!objKeys.includes(+key)) {
      delete viewList[key];
    }
  });

  obj.forEach((order) => {
    const target = viewList[order.order_id];
    if (target) {
      target.setContext(order);
      target.render();

      return true;
    }

    const orderContainer = new OrdersContainer(order);
    viewList[order.order_id] = orderContainer;

    orderList.appendChild(orderContainer.self);
  });
};

export const controlDetails: Callback = () => {
  const detailsBtn = <HTMLButtonElement>(
    document.getElementsByClassName("orders-history__detail")[0]
  );
  const listOrderTitle = <HTMLElement>(
    document.getElementsByClassName("order-item__collapse")[0]
  );
  const listOrder = <HTMLElement>(
    document.getElementsByClassName("order-item__list")[0]
  );
  if (detailsBtn.classList.contains("opened")) {
    detailsBtn.classList.remove("btn__active");
    detailsBtn.classList.remove("opened");
    detailsBtn.classList.add("closed");
    listOrder.classList.remove("open");
    listOrderTitle.classList.remove("open");
  } else {
    detailsBtn.classList.add("btn__active");
    detailsBtn.classList.remove("closed");
    detailsBtn.classList.add("opened");
    listOrder.classList.add("open");
    listOrderTitle.classList.add("open");
  }
};

export const fieldsFill: Callback = () => {
  const userName = <HTMLImageElement>document.getElementsByClassName("b2n")[0];

  userName.textContent = user.username;
};

export const showAvatar: Callback = () => {
  const photo = <HTMLImageElement>document.getElementsByClassName("b2m5")[0];
  photo.style.backgroundImage = `url(${user.avatar})`;
};

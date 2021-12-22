import bus from "../../modules/bus/bus";

const initEvents: (self: HTMLElement) => void = (self) => {
  const profileBtnMenu = <HTMLElement>(
    self.getElementsByClassName('profile')[0]
  );
  profileBtnMenu.addEventListener("click", (event) => {
    event.preventDefault();

    bus.emit("profile button click", undefined);
  });

  const reviewsBtnMenu = <HTMLElement> (
    self.getElementsByClassName('reviews')[0]
  );
  reviewsBtnMenu.addEventListener("click", (event) => {
    event.preventDefault();
    bus.emit("reviews button click", undefined);
  });

  const ordersBtnMenu = <HTMLElement> (
    self.getElementsByClassName('orders')[0]
  );
  ordersBtnMenu.addEventListener("click", (event) => {
    event.preventDefault();
    bus.emit("orders button click", undefined);
  });

  const favoriteBtn = <HTMLAnchorElement>(
    self.getElementsByClassName('favorite')[0]
  );
  favoriteBtn?.addEventListener("click", (event) => {
    event.preventDefault();
    bus.emit("favorite button click", undefined);
  });
};

export default initEvents;
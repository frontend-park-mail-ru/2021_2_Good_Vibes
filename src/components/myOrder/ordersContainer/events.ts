import bus from "../../../modules/bus/bus";

const initEvents: (self: HTMLElement) => void = (self) => {
  const controlDetails = () => {
    const detailsBtn = <HTMLButtonElement>(
      self.getElementsByClassName("orders-history__detail")[0]
    );
    const listOrderTitle = <HTMLElement>(
      self.getElementsByClassName("order-item__collapse")[0]
    );
    const listOrder = <HTMLElement>(
      self.getElementsByClassName("order-item__list")[0]
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


  const detailsBtn = <HTMLButtonElement>(
    self.getElementsByClassName("orders-history__detail")[0]
  );
  detailsBtn?.addEventListener("click", (event) => {
    event.preventDefault();
    controlDetails();
    /* bus.emit("details button click", undefined); */
  });
};

export default initEvents;

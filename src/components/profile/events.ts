import bus from "../../modules/bus/bus";

const initEvents: (self: HTMLElement) => void = (self) => {
  // ---------------------
  const profilePic = <HTMLElement>self.getElementsByClassName("b2m4")[0];
  const uploadBtn = <HTMLElement>self.getElementsByClassName("b2m6")[0];

  console.log(profilePic);

  const mouseEventHandler = (event: MouseEvent) => {
    const uploadBtn = <HTMLElement>self.getElementsByClassName('b2m6')[0];
    if (event.type === 'mouseover') {
      uploadBtn.style.opacity = '1';
    }
    if (event.type === 'mouseout') {
      uploadBtn.style.opacity = '0';
    }
  };

  profilePic.onmouseover = mouseEventHandler;
  profilePic.onmouseout = mouseEventHandler;

  // ---------------------
  const inputImg = <HTMLImageElement>self.getElementsByClassName("b2m4")[0];
  const file = <HTMLInputElement>self.getElementsByClassName("uploadFile")[0];

  inputImg.addEventListener("click", (event) => {
    event.preventDefault();
    file.click();
  });



  file.addEventListener("change", (event) => {
    event.preventDefault();

    const choosedFile = file.files[0];
    if (choosedFile) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const img = <HTMLElement>document.getElementsByClassName("b2m5")[0];
        /* img.setAttribute('src', <string>reader.result); */
        img.style.backgroundImage = `url(${reader.result})`;
      });
      reader.readAsDataURL(choosedFile);
    }
  });

  const updateBtn = <HTMLButtonElement>self.getElementsByClassName('update-btn')[0];
  updateBtn.addEventListener('click', (event) => {
    event.preventDefault();

    bus.emit('update button click', undefined);
  });

  // --------------------------

  const changeBtn = <HTMLButtonElement>self.getElementsByClassName('change-btn')[0];
  changeBtn.addEventListener('click', (event) => {
    event.preventDefault();

    bus.emit('change button click', undefined);
  });

  const profileBtnMenu = <HTMLElement>(
    self.getElementsByClassName('profile')[0]
  );
  profileBtnMenu.addEventListener("click", (event) => {
    event.preventDefault();

    bus.emit("profile button click", undefined);
  });

  const reviewsBtnMenu = <HTMLElement>(
    self.getElementsByClassName('reviews')[0]
  );
  reviewsBtnMenu.addEventListener("click", (event) => {
    event.preventDefault();
    bus.emit("reviews button click", undefined);
  });

  const ordersBtnMenu = <HTMLElement>(
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

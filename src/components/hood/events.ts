import bus from "../../modules/bus/bus";

const initEvents: (self: HTMLElement) => void = (self) => {
  // ------------------
  const logoBtn = <HTMLAnchorElement>(
    self.getElementsByClassName('header__logo')[0]
  );
  logoBtn.addEventListener("click", (event) => {
    event.preventDefault();

    bus.emit("logo button click", undefined);
    // window.location.search = '?minPrice=777';
  });

  // ------------------
  const profileBtn = <HTMLElement>(
    self.getElementsByClassName('icons__link-avatar')[0]
  );
  profileBtn.addEventListener("click", (event) => {
    event.preventDefault();

    bus.emit("profile button click menu", undefined);
  });

  const profileBtnMenu = <HTMLElement>(
    self.getElementsByClassName('profile')[0]
  );
  profileBtnMenu.addEventListener("click", (event) => {
    event.preventDefault();

    bus.emit("profile button click", undefined);
  });

  const signOutBtn = self.getElementsByClassName('logout')[0];
  signOutBtn.addEventListener("click", (event) => {
    event.preventDefault();

    bus.emit("signOut button click", undefined);
  });
  // ------------------
  const cartBtn = <HTMLAnchorElement>(
    self.getElementsByClassName('icons__link-cart')[0]
  );
  cartBtn.addEventListener("click", (event) => {
    event.preventDefault();

    bus.emit("cart button click", undefined);
  });

  // ---------------------
  const asideBtn = <HTMLElement>self.getElementsByClassName('header__aside')[0];
  asideBtn.addEventListener("click", (event) => {
    event.preventDefault();

    bus.emit("aside button click", undefined);
  });
  const closeBtn = <HTMLElement>self.getElementsByClassName('burger-close')[0];
  closeBtn.addEventListener("click", (event) => {
    event.preventDefault();

    bus.emit("aside button click hide", undefined);
  });

  const searchBtn = <HTMLElement>(
    self.getElementsByClassName('nav-element__search')[0]
  );
  searchBtn.addEventListener("click", (event) => {
    event.preventDefault();

    bus.emit("search button click", undefined);
  });

  //----------------------------------------------------

  const profileContainerNode = <Node>(
    self.getElementsByClassName('header-dropdown')[0]
  );
  const profileBtnNode = <Node>(
    self.getElementsByClassName("icons__link-avatar")[0]
  );

  document.addEventListener("click", (event) => {

    const targetNode = <Node>event.target;
    const targetElement = <HTMLElement>event.target;

    if (targetElement.tagName === "A") {
      bus.emit("hide handle profile", undefined);
      return;
    }

    if (
      profileContainerNode.contains(targetNode) ||
      profileBtnNode.contains(targetNode)
    )
      return;
    bus.emit("hide handle profile", undefined);
  });
};

export default initEvents;

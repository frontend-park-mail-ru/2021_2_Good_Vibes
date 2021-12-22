import { order } from "../../api/callbacks";
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

  const reviewsBtnMenu = <HTMLElement>(
    self.getElementsByClassName('reviews')[0]
  );
  reviewsBtnMenu.addEventListener("click", (event) => {
    event.preventDefault();
    bus.emit("reviews button click", undefined);
  })

  const ordersBtnMenu = <HTMLElement>(
    self.getElementsByClassName('orders')[0]
  );
  ordersBtnMenu.addEventListener("click", (event) => {
    event.preventDefault();
    bus.emit("orders button click", undefined);
  })

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

  //--------------------
  const favoriteBtn = <HTMLAnchorElement>(
    self.getElementsByClassName('icons__link-like')[0]
  );
  favoriteBtn?.addEventListener("click", (event) => {
    event.preventDefault();
    bus.emit("favorite button click", undefined);
  });
  //----------------------
  const newestBtn = <HTMLElement>(
    self.getElementsByClassName('new')[0]
  );
  newestBtn?.addEventListener("click", (event) => {
    event.preventDefault();
    bus.emit("newest button click", undefined);
  })

  const salesBtn = <HTMLElement>(
    self.getElementsByClassName('sales')[0]
  );
  salesBtn?.addEventListener("click", (event) => {
    event.preventDefault();
    bus.emit("sales button click", undefined);
  })
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

  //----------------------------------------------------

  const profileContainerNode = <Node>(
    self.getElementsByClassName('header-dropdown-content')[0]
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

  //----------------------------------------------------
  const searchBtn = <HTMLElement>(
    self.getElementsByClassName('nav-element__search')[0]
  );
  searchBtn.addEventListener("click", (event) => {
    event.preventDefault();

    bus.emit("search button click", undefined);
  });

  // -----------------------------
  const favoriteBtnMenu = <HTMLElement>(
    self.getElementsByClassName('favorite')[0]
  );
  favoriteBtnMenu?.addEventListener("click", (event) => {
    event.preventDefault();

    bus.emit("favorite button click", undefined);
  })


  // -----------------------------
  const brandsBtnMenu = <HTMLElement>(
    self.getElementsByClassName('nav__link brands')[0]
  );
  brandsBtnMenu?.addEventListener("click", (event) => {
    event.preventDefault();

    bus.emit("brands button click", undefined);
  })
};

export default initEvents;

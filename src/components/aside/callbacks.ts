import bus from "../../init/bus";
import { AjaxResponse, Callback, Category } from "../../types";
import categoryList from "../../object/category/list";

export const show: Callback = () => {
  const asideObj = <HTMLElement>(
    document.getElementsByClassName("aside-container")[0]
  );
  asideObj.classList.add("open");
  const headerObj = <HTMLElement>document.getElementsByClassName("header")[0];
  headerObj.classList.add("aside-header");
  const bodyObj = <HTMLElement>document.getElementsByTagName("body")[0];
  bodyObj.classList.add("body-overflow");
  const openObj = <HTMLElement>(
    document.getElementsByClassName("header__aside")[0]
  );
  openObj.style.display = "none";
  const closeObj = <HTMLElement>(
    document.getElementsByClassName("burger-close")[0]
  );
  closeObj.style.display = "block";
  const overlayElem = <HTMLElement>(
    document.getElementsByClassName("overlay")[0]
  );
  overlayElem.style.display = "block";
  /* const closeBtn = document.getElementsByClassName('burger-close')[0];
  console.log('close', closeBtn);
   closeBtn.addEventListener('click', (event) => {
   event.preventDefault();
   bus.emit('hide aside by button', undefined);
 }); */
  /*  const asideBtn = document.getElementsByClassName('header__aside')[0];
 asideBtn.addEventListener('click', (event) => {
   event.preventDefault();

   bus.emit('show aside', undefined);
 }); */
};

export const showCategories: Callback = (obj: HTMLElement) => {
  const allProductUlCollection = obj
    .getElementsByClassName("categories")[0]
    .getElementsByTagName("ul");
  Array.from(allProductUlCollection).forEach((el) => {
    el.hidden = true;
  });

  const b = allProductUlCollection[0].childNodes;
  Array.from(b).forEach((el: HTMLElement) => {
    el.hidden = false;
    const c = <HTMLElement>el.getElementsByClassName("fa")[0];
    c.style.transform = "rotate(90deg)";
  });

  allProductUlCollection[0].hidden = false;
  const a = <HTMLElement>(
    allProductUlCollection[0].getElementsByClassName("fa")[0]
  );
  a.style.transform = "rotate(270deg)";
};

export const hide: Callback = () => {
  const asideObj = <HTMLElement>(
    document.getElementsByClassName("aside-container")[0]
  );
  asideObj.classList.remove("open");
  /* const bodyElem = <HTMLElement>document.getElementsByClassName("body")[0];
  bodyElem.removeChild[1];
 */
  showCategories(asideObj);
};

const rotateChevron: (el: HTMLElement) => void = (el) => {
  const rotateReg = el.style.transform;
  let rotate = 90;
  if (rotateReg) {
    rotate = +rotateReg.match(/.*rotate\((\d+)deg\)/)[1];
  }
  rotate = (rotate + 180) % 360;
  el.style.transform = `rotate(${rotate}deg)`;
};
/* export const hide: Callback = () => {
  const asideObj = <HTMLElement>document.getElementsByClassName('aside-container')[0];
  asideObj.classList.remove('open');
  const headerObj = <HTMLElement>document.getElementsByClassName('header')[0];
  headerObj.classList.remove('aside-header');
  const bodyObj = <HTMLElement>document.getElementsByTagName('body')[0];
  bodyObj.classList.remove('body-overflow');
  /* const btnObj = <HTMLElement>document.getElementsByClassName('header__aside')[0];
  btnObj.classList.remove('burger-close');
}; */

export const hideByBtn: Callback = () => {
  console.log("hidebybtn");
  const asideObj = <HTMLElement>(
    document.getElementsByClassName("aside-container")[0]
  );
  asideObj.classList.remove("open");
  const headerObj = <HTMLElement>document.getElementsByClassName("header")[0];
  headerObj.classList.remove("aside-header");
  const bodyObj = <HTMLElement>document.getElementsByTagName("body")[0];
  bodyObj.classList.remove("body-overflow");
  const openObj = <HTMLElement>(
    document.getElementsByClassName("header__aside")[0]
  );
  openObj.style.display = "block";
  const closeObj = <HTMLElement>(
    document.getElementsByClassName("burger-close")[0]
  );
  closeObj.style.display = "none";
  const overlayElem = <HTMLElement>(
    document.getElementsByClassName("overlay")[0]
  );
  overlayElem.style.display = "none";
  /* const btnObj = <HTMLElement>document.getElementsByClassName('header__aside')[0];
  btnObj.classList.remove('burger-close'); */
  /* const asideBtn = document.getElementsByClassName('header__aside')[0];
 asideBtn.addEventListener('click', (event) => {
   event.preventDefault();

   bus.emit('show aside', undefined);
 });   */
};

export const addLiEvents: (li: HTMLLIElement, obj: Category) => void = (
  li,
  obj
) => {
  const { name, description } = obj;

  li.addEventListener("click", (event) => {
    event.preventDefault();

    const target = <HTMLElement>event.target;

    if (target.tagName === "A") {
      bus.emit("category state request", { name, description });
      return;
    }

    // console.log(li.getElementsByClassName('fa'));
    rotateChevron(<HTMLElement>li.getElementsByClassName("fa")[0]);

    // if (target.tagName !== 'SPAN') return;

    // const ulCollection = li.parentElement.getElementsByTagName('ul');

    const ulCollection = li.parentElement.childNodes;

    // const ulCollection = li.parentNode.querySelector('ul');

    if (!ulCollection) return;

    Array.from(ulCollection).forEach((child: HTMLElement) => {
      // eslint-disable-next-line no-param-reassign
      if (child.tagName === "UL") {
        child.hidden = !child.hidden;
      }
    });
  });
};

export const addCategory: (obj: Category, parent: HTMLElement) => HTMLElement =
  (obj, parent) => {
    const { name, description } = obj;

    categoryList[name] = description;
    const child = <HTMLUListElement>document.createElement("ul");

    child.style.paddingLeft = "10px";
    child.style.listStyleType = "none";
    child.hidden = true;

    const li = <HTMLLIElement>document.createElement("li");
    addLiEvents(li, obj);
    child.appendChild(li);

    const link = <HTMLAnchorElement>document.createElement("a");
    link.innerHTML = description;
    link.className = "categories__span-fa";
    li.appendChild(link);

    if (obj.children) {
      const span = <HTMLAnchorElement>document.createElement("span");
      link.appendChild(span);
      const i = <HTMLElement>document.createElement("i");
      i.className = "fa fa-chevron-right";
      /* i.style.marginRight = "20px"; */
      span.appendChild(i);
    }

    parent.appendChild(child);
    return child;
  };

export const handleObj: (obj: Category, parent: HTMLElement) => void = (
  obj,
  parent
) => {
  const child = addCategory(obj, parent);

  if (obj.children) {
    obj.children.forEach((element) => {
      handleObj(element, child);
    });
  }
};

export const parseCategoryObject: Callback = (obj: Category) => {
  const parent = <HTMLElement>document.getElementsByClassName("categories")[0];

  handleObj(obj, parent);

  showCategories(document.getElementsByClassName("aside-container")[0]);
};

export const parse: Callback = (response: AjaxResponse) => {
  const { responseText } = response;
  Promise.resolve()
    .then(() => JSON.parse(responseText))
    .then((parsedObj: Category) => parseCategoryObject(parsedObj))

    .catch((err) => console.error("category response parse error", err));
};

export const hideHandle: Callback = () => {
  const asideContainerNode = <Node>(
    document.getElementsByClassName("aside-container")[0]
  );
  const asideBtnNone = <Node>(
    document.getElementsByClassName("header__aside")[0]
  );

  document.addEventListener("click", (event) => {
    const targetNode = <Node>event.target;
    const targetElement = <HTMLElement>event.target;

    if (targetElement.tagName === "A") {
      hideByBtn(undefined);
      return;
    }

    if (
      asideContainerNode.contains(targetNode) ||
      asideBtnNone.contains(targetNode)
    )
      return;
      hideByBtn(undefined);
  });
}; 

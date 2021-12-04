import bus from '../../init/bus';
import { AjaxResponse, Callback, Category } from '../../types';
import categoryList from '../../object/category/list';

export const show: Callback = () => {
  const asideObj = <HTMLElement>document.getElementsByClassName('aside-container')[0];
  asideObj.classList.add('open');
};

export const hide: Callback = () => {
  const asideObj = <HTMLElement>document.getElementsByClassName('aside-container')[0];
  asideObj.classList.remove('open');
};

export const addLiEvents: (li: HTMLLIElement, obj: Category) => void = (li, obj) => {
  const { name, description } = obj;

  li.addEventListener('click', (event) => {
    event.preventDefault();

    const target = <HTMLElement>event.target;

    if (target.tagName === 'A') {
      bus.emit('category state request', { name, description });
      return;
    }

    // if (target.tagName !== 'SPAN') return;

    const ulCollection = li.parentElement.getElementsByTagName('ul');

    // const ulCollection = li.parentNode.querySelector('ul');

    if (!ulCollection) return;

    // ulCollection.hidden = !ulCollection.hidden;

    // if (ulCollection.hidden) {
    //   target.classList.add('hide');
    //   target.classList.remove('show');
    // } else {
    //   target.classList.add('show');
    //   target.classList.remove('hide');
    // }

    Array.from(ulCollection).forEach((child) => {
      // eslint-disable-next-line no-param-reassign

      child.hidden = !child.hidden;

      // child.hidden = true;
    });

    // const ul = li.parentNode.querySelector('ul');
    // ul.hidden = false;
    // let nextSubling = ul.nextSibling;
    // while (nextSubling) {
    //   nextSubling
    // }
  });
};

export const addCategory: (obj: Category, parent: HTMLElement) => HTMLElement = (obj, parent) => {
  const { name, description } = obj;

  categoryList[name] = description;
  // console.log(categoryList);

  const child = <HTMLUListElement>document.createElement('ul');

  child.style.paddingLeft = '0';
  child.style.listStyleType = 'none';

  const li = <HTMLLIElement>document.createElement('li');
  addLiEvents(li, obj);
  child.appendChild(li);

  const link = <HTMLAnchorElement>document.createElement('a');
  link.innerHTML = description;
  link.className = 'categories__span-fa';
  li.appendChild(link);

/*   if (obj.children) {
    const span = <HTMLAnchorElement>document.createElement('span');
    li.appendChild(span);
    const i = <HTMLElement>document.createElement('i');
    i.className = 'fa fa-chevron-right';
    span.appendChild(i);
  } */

  parent.appendChild(child);
  return child;
};

export const handleObj: (obj: Category, parent: HTMLElement) => void = (obj, parent) => {
  const child = addCategory(obj, parent);

  if (obj.children) {
    obj.children.forEach((element) => {
      handleObj(element, child);
    });
  }
};

export const parseCategoryObject: Callback = (obj: Category) => {
  const parent = <HTMLElement>document.getElementsByClassName('categories')[0];

  handleObj(obj, parent);
};

export const parse: Callback = (response: AjaxResponse) => {
  const { responseText } = response;
  Promise.resolve()
    .then(() => JSON.parse(responseText))
    .then((parsedObj: Category) => parseCategoryObject(parsedObj))

    .catch((err) => console.error('category response parse error', err));
};

export const hideHandle: Callback = () => {
  const asideContainerNode = <Node>document.getElementsByClassName('aside-container')[0];
  const asideBtnNone = <Node>document.getElementsByClassName('header__aside')[0];

  document.addEventListener('click', (event) => {
    const targetNode = <Node>event.target;
    const targetElement = <HTMLElement>event.target;

    if (targetElement.tagName === 'A') {
      hide(undefined);
      return;
    }

    if (asideContainerNode.contains(targetNode) || asideBtnNone.contains(targetNode)) return;
    hide(undefined);
  });
};

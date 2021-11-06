/* eslint-disable import/extensions */
import eventBus from '../scripts/eventBus.js';

export const showAside = () => {
  const asideObj = document.getElementById('aside-container');
  asideObj.classList.add('open');
};

export const hideAside = () => {
  const asideObj = document.getElementById('aside-container');
  asideObj.classList.remove('open');
};

export const addCategory = (name, parent) => {
  const child = document.createElement('li');

  const href = document.createElement('a');
  href.href = '#';
  href.innerHTML = name;

  const span = document.createElement('span');

  const i = document.createElement('i');
  i.className = 'fa fa-chevron-right';

  span.appendChild(i);

  href.appendChild(span);

  child.appendChild(href);

  parent.appendChild(child);

  href.addEventListener('click', (event) => {
    event.preventDefault();

    // eventBus.emit('category request', name);
    eventBus.emit('category state request', name);
  });

  return child;
};

export const handleObj = (obj, parent) => {
  console.log(obj.name);

  const child = addCategory(obj.name, parent);

  if (obj.children) {
    obj.children.forEach((element) => {
      handleObj(element, child);
    });
  }
};

export const parseCategoryObject = (obj) => {
  console.log('parseCategoryObject');

  console.log(obj);

  const parent = document.getElementsByClassName('categories')[0];

  handleObj(obj, parent);

  // ---------------

  const child = document.createElement('li');

  const href = document.createElement('a');
  href.href = '#';
  const name = 'fake af';
  href.innerHTML = name;

  const span = document.createElement('span');

  const i = document.createElement('i');
  i.className = 'fa fa-chevron-right';

  span.appendChild(i);

  href.appendChild(span);

  child.appendChild(href);

  parent.appendChild(child);

  href.addEventListener('click', (event) => {
    event.preventDefault();

    // eventBus.emit('category request', name);
    eventBus.emit('category state request', name);

  });
};


export const showSubCategory = () => {
  const subcategory = document.getElementsByClassName('category')[0];
  const subcategory1 = document.getElementsByClassName('category')[1];

  subcategory.classList.toggle("subcategory");
  subcategory1.classList.toggle("subcategory");
}

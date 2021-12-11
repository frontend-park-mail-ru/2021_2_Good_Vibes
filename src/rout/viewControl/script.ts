import bus from '../init/bus';
import { Product, ViewInterface, Callback } from '../types';
import constructor from './constructors';
import redirect from '../dispatcher/redirect';

type ShowViewSignature = (obj: { 'name': string, 'context': Product }) => void;

const viewMap: {
  [name: string]: {
    'view': ViewInterface,
    'visibility': boolean,
  }
} = {};

let currentView: string;

const add: (name: string, view: ViewInterface) => void = (name: string, view: ViewInterface) => {
  viewMap[name] = {
    view,
    visibility: true,
  };
};

const viewGenerate: (name: string) => void = (name: string) => {
  if (!constructor[name]) {
    console.error('haven\'t constructor for name', name);
    return;
  }

  const view = new constructor[name](name);

  add(name, view);
  viewMap[name].visibility = false;
};

export const showView: ShowViewSignature = (obj: { 'name': string, 'context': Product }) => {
  const { name, context } = obj;

  const header = <HTMLElement>document.getElementsByClassName('header')[0];
  const footer = <HTMLElement>document.getElementsByClassName('footer')[0];
  const viewer = <HTMLElement>document.getElementsByClassName('wiki-viewer')[0];

  header.style.visibility = 'visible';
  footer.style.visibility = 'visible';
  viewer.style.visibility = 'visible';

  if (name === 'signin' || name === 'signup') {
    header.style.visibility = 'hidden';
    footer.style.visibility = 'hidden';
    viewer.style.visibility = 'hidden';
  }

  // Object.keys(viewMap).forEach((key) => {
  //   viewMap[key].visibility = false;
  // });

  // if (name === currentView) {
  //   return;
  // }

  if (currentView) {
    Promise.resolve()
      .then(() => bus.emit(`${currentView} hidden`, undefined))
      .then(() => { viewMap[currentView].visibility = false; });
  }

  if (!viewMap[name]) {
    viewGenerate(name);
  }

  // --------------------

  const { view } = viewMap[name];

  if (context) {
    view.setContext(context);
    view.render();
  }

  // --------------------

  viewMap[name].visibility = true;

  let fullName = name;
  if (context) {
    fullName += ` ${context.id}`;
  }

  Promise.resolve()
    .then(() => {
      if (currentView !== name) {
        document.getElementById('layout').replaceWith(view.self);
      }
    })
    .then(() => { currentView = name; })
    .then(() => { if (fullName !== name) bus.emit(`${name} shown`, context); })
    .then(() => bus.emit(`${fullName} shown`, context));
};

export const a = 0;

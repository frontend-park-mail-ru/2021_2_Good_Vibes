import bus from '../../modules/bus/bus';
import cart from '../../services/cart/cart';
import user from '../../services/user/user';
import { addToHistory } from '../../rout/callbacks';
import {
  AjaxResponse, Callback, CategoryResponseObject, Product, Brand,
} from '../../types';
import redirect from '../redirect';
import searchParams from '../../services/search/params';
// import state from '../state';

export const showSignIn: Callback = () => {
  bus.emit('show view', { name: 'signin' });
};

export const showSignUp: Callback = () => {
  bus.emit('show view', { name: 'signup' });
};

export const showProfile: Callback = () => {
  bus.emit('show view', { name: 'profile' });
};

export const showHomepage: Callback = () => {
  bus.emit('show view', { name: 'homepage' });
};

export const signOut: Callback = () => {
  bus.emit('homepage state request', undefined);
};

export const addUser: Callback = (obj: { 'responseText': string }) => {
  const { responseText } = obj;

  Promise.resolve()
    .then(() => JSON.parse(responseText))
    .then((value) => user.set(value))
    .then(() => bus.emit('add user finished', undefined))
    .catch((err) => console.error(err));
};

export const cartGetRequest: Callback = () => {
  bus.emit('cart get request', undefined);
};

export const homepageArrayParse: Callback = (response: AjaxResponse) => {
  const { responseText } = response;

  Promise.resolve()
    .then(() => JSON.parse(responseText))
    .then((obj: Product[]) => bus.emit('add product array to homepage', obj))
    .catch((err) => console.error(err));
};

export const homepage: Callback = () => {
  bus.emit('homepage state confirmed', { pathname: '/' });
};

export const favorite: Callback = () => {
  bus.emit('favorite state confirmed', { pathname: '/favorite' });
};

export const brands: Callback = () => {
  bus.emit('brands state confirmed', { pathname: '/brands' });
};

export const newest: Callback = () => {
  bus.emit('newest state confirmed', { pathname: '/new' });
};

export const sales: Callback = () => {
  bus.emit('sales state confirmed', { pathname: '/sales' });
};

export const showCart: Callback = () => {
  // bus.emit('show view', { name: 'cart' });

  if (cart.isEmpty()) {
    bus.emit('show view', { name: 'emptyCart' });
    return;
  }

  bus.emit('show view', { name: 'cart' });
};

export const showFavorite: Callback = () => {
  bus.emit('show view', { name: 'favorite' });
}

export const showBrands: Callback = () => {
  bus.emit('show view', { name: 'brands' });
}

export const showNewest: Callback = () => {
  bus.emit('show view', { name: 'newest' });
}

export const showSales: Callback = () => {
  bus.emit('show view', { name: 'sales' });
}

export const showProductPage: Callback = (obj: { 'context': Product }) => {
  const { context } = obj;
  /* obj.context.isFavorite = true; */
  console.log(context);
  if (context.is_favourite === true) {
    context.nameBtn = 'Удалить из избранного';
    console.log(context.nameBtn);
    const addBtnParent = <HTMLButtonElement>document.getElementsByClassName('info-card-btn__favorite')[0];

    const cartBtnElem = <HTMLButtonElement>document.createElement('button');
    cartBtnElem.className = 'info-card-btn__add-favorite';
    cartBtnElem.innerHTML = 'Убрать из избранного';
  } else {
    obj.context.nameBtn = 'Добавить в избранное'
  }
  // console.log('showProductPage', context);

  bus.emit('show view', { name: 'productPage', context });
};

export const productStateConfirmed: Callback = (obj: { 'responseText': string }) => {
  const { responseText } = obj;

  Promise.resolve()
    .then(() => JSON.parse(responseText))
    .then((parseObj: Product) => bus.emit('product state confirmed', { pathname: `/product?id=${parseObj.id}`, context: parseObj, state: 'product' }))
    .catch((err) => console.error('product page response parse error', err));
};

export const brandProducts: Callback = ({ id }: { id: number }) => {

  addToHistory({
    // pathname: `/category?name=${obj.name}`,

    pathname: `/brand/products`,

    searchParams,

    id,
    // pathname: `${obj.pathname}`,
  });

  // bus.emit('brands products state confirmed', { pathname: '/brand/products' });
  // bus.emit('show view', { name: 'brandsProductPage', pathname: 'brand/products' });
  bus.emit('show view', { name: 'brandsProductPage', pathname: '/brand/products' });



};

export const category: Callback = () => {
  bus.emit('category state confirmed', { pathname: '/category' });
};

export const categoryArrayParse: Callback = (response: AjaxResponse) => {
  const { responseText } = response;
  console.log("categoryarrayParse")
  Promise.resolve()
    .then(() => JSON.parse(responseText))
    .then((obj: CategoryResponseObject) => {
      if (searchParams.minPriceStatic != obj.min_price) {
        searchParams.minPrice = obj.min_price;
      }
      if (searchParams.maxPriceStatic != obj.max_price) {
        searchParams.maxPrice = obj.max_price;
      }
      searchParams.minPriceStatic = obj.min_price;
      searchParams.maxPriceStatic = obj.max_price;
      bus.emit('add product array to category page', obj.products);

      // bus.emit('add product array to category page', obj.products);
    })
    .catch((err) => console.error(err));
};

export const showCategoryPage: Callback = () => {
  bus.emit('show view', { name: 'categoryPage' });
};

export const categoryAddToHistory: Callback = (obj: { name: string, pathname: string }) => {

  addToHistory({
    // pathname: `/category?name=${obj.name}`,

    pathname: `/category/${obj.name}`,

    searchParams,

    // pathname: `${obj.pathname}`,
  });

};

export const address: Callback = () => {
  bus.emit('show view', { name: 'addressPage' });
};

export const payment: Callback = () => {
  bus.emit('show view', { name: 'paymentPage' });
};

export const confirmation: Callback = () => {
  bus.emit('show view', { name: 'confirmationPage' });
};

export const orders: Callback = () => {
  bus.emit('show view', { name: 'orders' });
};


export const reviews: Callback = () => {
  bus.emit('show view', { name: 'reviews' });
};


export const search: Callback = (response: { 'responseText': string, 'pathname': string, 'str': string }) => {
  // bus.emit('show view', { name: 'search' });

  // console.warn(response);
  addToHistory({
    pathname: response.pathname,
    str: response.str,
    searchParams,
  });

  const { responseText } = response;

  Promise.resolve()
    .then(() => bus.emit('show view', { name: 'search' }))
    // .then(() => console.log('asdfadsf'))
    .then(() => JSON.parse(responseText))
    .then((obj: Product[]) => {

      const a = obj.sort((a, b) => a.price - b.price);

      // debugger;

      // searchParams.minPrice = a[0].price;
      // searchParams.maxPrice = a[a.length - 1].price;

      // searchParams.minPriceStatic = a[0].price;
      // searchParams.maxPriceStatic = a[a.length - 1].price;

      // searchParams.minPrice = a[0].price;
      // searchParams.maxPrice = a[a.length - 1].price;

      searchParams.minPriceStatic = a[0].price;
      searchParams.maxPriceStatic = a[a.length - 1].price;


      // if (searchParams.minPriceStatic != a[0].price) {
      //   searchParams.minPrice = a[0].price;
      // }
      // if (searchParams.maxPriceStatic != a[a.length - 1].price) {
      //   searchParams.maxPrice = a[a.length - 1].price;
      // }
      // searchParams.minPriceStatic = a[0].price;
      // searchParams.maxPriceStatic = a[a.length - 1].price;

      // debugger;

      bus.emit('show search results', obj);
    })
    .catch((err) => console.error(err));
};

// export const categoryArrayParse: Callback = (response: AjaxResponse) => {
//   const { responseText } = response;
//   console.log("categoryarrayParse")
//   Promise.resolve()
//     .then(() => JSON.parse(responseText))
//     .then((obj: CategoryResponseObject) => {
//       if (searchParams.minPriceStatic != obj.min_price) {
//         searchParams.minPrice = obj.min_price;
//       }
//       if (searchParams.maxPriceStatic != obj.max_price) {
//         searchParams.maxPrice = obj.max_price;
//       }
//       searchParams.minPriceStatic = obj.min_price;
//       searchParams.maxPriceStatic = obj.max_price;
//       bus.emit('add product array to category page', obj.products);

//       // bus.emit('add product array to category page', obj.products);
//     })
//     .catch((err) => console.error(err));
// };


export const saveState: Callback = (obj: { 'state': string }) => {
  // console.log(obj);

  redirect.saveState(obj);
};


export const handleAjaxRecommendationConfirmed: Callback = (response: AjaxResponse) => {
  const { responseText } = response;

  // debugger;

  Promise.resolve()
    .then(() => JSON.parse(responseText))
    .then((obj: Product[]) => bus.emit('recommendations product array parsed', obj))
    .catch((err) => console.error("JSON parse error", err));
};

export const handleAjaxFavoriteConfirmed: Callback = (response: AjaxResponse) => {
  const { responseText } = response;
  Promise.resolve()
    .then(() => JSON.parse(responseText))
    .then((obj: Product[]) => bus.emit("favorite product array parsed", obj))
    .catch((err) => console.error("JSON parse error", err));
};

export const handleAjaxNewestConfirmed: Callback = (response: AjaxResponse) => {
  const { responseText } = response;
  Promise.resolve()
    .then(() => JSON.parse(responseText))
    .then((obj: Product[]) => bus.emit("newest product array parsed", obj))
    .catch((err) => console.error("JSON parse error", err));
};


export const handleAjaxSalesConfirmed: Callback = (response: AjaxResponse) => {
  const { responseText } = response;
  Promise.resolve()
    .then(() => JSON.parse(responseText))
    .then((obj: Product[]) => bus.emit("sales product array parsed", obj))
    .catch((err) => console.error("JSON parse error", err));
};

export const handleAjaxBrandsConfirmed: Callback = (response: AjaxResponse) => {
  const { responseText } = response;
  Promise.resolve()
    .then(() => JSON.parse(responseText))
    .then((obj: Brand[]) => bus.emit("brands array parsed", obj))
    .catch((err) => console.error("JSON parse error", err));
};

export const handleAjaxBrandsProductsConfirmed: Callback = (response: AjaxResponse) => {
  const { responseText } = response;
  Promise.resolve()
    .then(() => JSON.parse(responseText))
    .then((obj: Brand[]) => bus.emit("brands products array parsed", obj))
    .catch((err) => console.error("JSON parse error", err));
};
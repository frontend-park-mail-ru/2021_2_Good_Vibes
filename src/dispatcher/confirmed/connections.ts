import { addToHistory } from '../../rout/callbacks';
import { Connection, OrderRequest } from '../../types';
import * as confirm from './callbacks';
import * as request from '../request/callbacks';
import searchParams from '../../services/search/params';
import bus from '../../modules/bus/bus';
import * as searchFiltersContainer from '../../components/searchFiltersContainer/callbacks';



const connections: Connection[] = [
  {
    event: 'signIn state confirmed',
    callback: [
      // confirm.saveState,
      confirm.showSignIn,
      addToHistory,
    ],
  },
  {
    event: 'signUp state confirmed',
    callback: [
      // confirm.saveState,
      confirm.showSignUp,
      addToHistory,
    ],
  },
  {
    event: 'profile state confirmed',
    callback: [
      // confirm.saveState,
      confirm.showProfile,
      addToHistory,
    ],
  },
  {
    event: 'homepage state confirmed',
    callback: [
      // confirm.saveState,
      confirm.showHomepage,
      addToHistory,
    ],
  },
  {
    event: 'signout confirmed',
    callback: [
      confirm.signOut,
    ],
  },
  {
    event: 'signIn ajax confirmed',
    callback: [
      confirm.addUser,
      confirm.cartGetRequest,
    ],
  },
  {
    event: 'signUp ajax confirmed',
    callback: [
      confirm.addUser,
      confirm.cartGetRequest,
    ],
  },
  {
    event: 'add user finished',
    callback: request.savedState,
  },
  {
    event: 'homepage ajax confirmed',
    callback: [
      confirm.homepageArrayParse,
      confirm.homepage,
    ],
  },
  {
    event: 'product request confirmed',
    callback: [
      confirm.productStateConfirmed,
    ],
  },
  {
    event: 'product state confirmed',
    callback: [
      // confirm.saveState,
      confirm.showProductPage,
      addToHistory,
    ],
  },
  {
    event: 'cart state confirmed',
    callback: [
      confirm.saveState,
      confirm.showCart,
      addToHistory,
    ],
  },
  {
    event: 'favorite state confirmed',
    callback: [
      confirm.saveState,
      confirm.showFavorite,
      addToHistory,
    ],
  },
  {
    event: 'brands state confirmed',
    callback: [
      confirm.saveState,
      confirm.showBrands,
      addToHistory,
    ],
  },
  {
    event: 'newest state confirmed',
    callback: [
      confirm.saveState,
      confirm.showNewest,
      addToHistory,
    ],
  },
  {
    event: 'sales state confirmed',
    callback: [
      confirm.saveState,
      confirm.showSales,
      addToHistory,
    ],
  },
  {
    event: 'category ajax confirmed',
    callback: [
      confirm.categoryArrayParse,
      confirm.category,
      //searchFiltersContainer.setFiltersParams,
    ],
  },
  {
    event: 'favorite ajax confirmed',
    callback: [
      confirm.favorite,
      confirm.handleAjaxFavoriteConfirmed,
    ],
  },
  {
    event: 'brands ajax confirmed',
    callback: [
      confirm.handleAjaxBrandsConfirmed,
      confirm.brands,
    ]
  },
  {
    event: 'newest ajax confirmed',
    callback: [
      confirm.handleAjaxNewestConfirmed,
      confirm.newest,
    ],
  },
  {
    event: 'brands product ajax confirmed',
    callback: [
      confirm.handleAjaxBrandsProductsConfirmed,
      confirm.brandProducts,
    ],
  },
  {
    event: 'sales ajax confirmed',
    callback: [
      confirm.handleAjaxSalesConfirmed,
      confirm.sales,
    ],
  },
  {
    event: 'category state confirmed',
    callback: [
      // confirm.saveState,
      confirm.showCategoryPage,
    ],
  },
  {
    event: 'brands products state confirmed',
    callback: [
      confirm.brandProducts,
    ],
  },
  {
    event: 'category ajax name',
    callback: [
      confirm.categoryAddToHistory,
    ]
  },
  {
    event: 'address state confirmed',
    callback: [
      // confirm.saveState,
      confirm.address,
      addToHistory,
    ],
  },
  {
    event: 'payment state confirmed',
    callback: [
      // confirm.saveState,
      confirm.payment,
      addToHistory,
    ],
  },
  {
    event: 'confirmation state confirmed',
    callback: [
      // confirm.saveState,
      confirm.confirmation,
      addToHistory,
    ],
  },
  {
    event: 'order confirmed',
    // callback: request.profile,
    callback: request.orders,
  },
  {
    event: 'orders state confirmed',
    callback: [
      confirm.orders,
      addToHistory,
    ],
  },
  {
    event: 'reviews state confirmed',
    callback: [
      confirm.reviews,
      addToHistory,
    ]
  },
  {
    event: 'search state confirmed',
    callback: [
      confirm.search,
      // addToHistory,
    ],
  },
  {
    event: 'cart confirm confirmed',
    callback: [
      (obj: OrderRequest): void => { bus.emit('cart ajax confirmed', obj); },
    ],
  },
  {
    event: 'ajax recommendations confirmed',
    callback: confirm.handleAjaxRecommendationConfirmed,
  },
];

export default connections;
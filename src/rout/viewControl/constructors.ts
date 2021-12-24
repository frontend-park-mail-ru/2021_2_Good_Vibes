import Profile from '../../components/profile/view';
import SignIn from '../../components/signin/view';
import SignUp from '../../components/signup/view';
import { ConstructorInterface } from '../../types';
import Homepage from '../../components/homepage/view';
import ProductPage from '../../components/productPage/view';
import Cart from '../../components/cart/view';
import CategoryPage from '../../components/categoryPage/view';
import AddressPage from '../../components/cart/address/view';
import PaymentPage from '../../components/cart/payment/view';
import ConfirmationPage from '../../components/cart/confirmation/view';
import EmptyCart from '../../components/cart/empty/view';
import Favorites from '../../components/favorites/view';
import { order } from '../../api/callbacks';
import Orders from '../../components/myOrder/view';
import Reviews from '../../components/reviews/view';
/* import SearchPage from '../../components/searchPage/view'; */
import Newest from '../../components/news/view';
import Sales from '../../components/sales/view';
import Brands from '../../components/brands/view';
import BrandProductPage from '../../components/brandProductsPage/view';
import SearchPage from '../../components/searchPage/view';
/* import Orders from '../view/orders/view'; */

const constructor: { [name: string]: ConstructorInterface } = {
  signup: SignUp,
  signin: SignIn,
  profile: Profile,
  homepage: Homepage,
  productPage: ProductPage,
  cart: Cart,
  categoryPage: CategoryPage,
  addressPage: AddressPage,
  paymentPage: PaymentPage,
  confirmationPage: ConfirmationPage,
  emptyCart: EmptyCart,
  /* orders: Orders, */
  // search: CategoryPage,

  search: SearchPage,


  favorite: Favorites,
  orders: Orders,
  reviews: Reviews,
  newest: Newest,
  sales: Sales,
  brands: Brands,
  brandsProductPage: BrandProductPage,
};

export default constructor;

import Profile from '../view/profile/view';
import SignIn from '../view/signin/view';
import SignUp from '../view/signup/view';
import { ConstructorInterface } from '../types';
import Homepage from '../view/homepage/view';
import ProductPage from '../view/productPage/view';
import Cart from '../view/cart/view';
import CategoryPage from '../view/categoryPage/view';
import AddressPage from '../view/cart/address/view';
import PaymentPage from '../view/cart/payment/view';
import ConfirmationPage from '../view/cart/confirmation/view';
import EmptyCart from '../view/cart/empty/view';
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
  search: CategoryPage,
};

export default constructor;

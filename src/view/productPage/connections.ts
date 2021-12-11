import { product } from '../../ajax/callbacks';
import { AjaxResponse, Connection } from '../../types';
import * as productPage from './callbacks';
import newCommentContainer from './newCommentContainer/view';

const connections: Connection[] = [
  {
    event: 'back to result button click',
    callback: productPage.backToCategoryPage,
  },
  {
    event: 'add product to cart',
    callback: productPage.changeBtn,

  },
  {
    event: 'add product to cart mobile',
    callback: productPage.changeBtnMobile,

  },
  {
    event: 'productPage shown',
    callback: [
      productPage.productCheckInCart,
      productPage.newCommentContainerShow,
      productPage.scrollToTop,
      productPage.commentsRequest,
      () => { newCommentContainer.cleanInput.call(newCommentContainer); },
      productPage.hideError,
    ],
  },
  {
    event: 'comments request confirmed',
    callback: [
      productPage.generateCommentsArray,
    ],
  },
  {
    event: 'add comment ajax request',
    callback: productPage.addCommentRequest,
  },
  {
    event: 'add comment request confirmed',
    callback: [
      // (response: AjaxResponse) => { console.log('add comment request confirmed', response); },
      productPage.handleResponse,
    ],
  },
];

export default connections;

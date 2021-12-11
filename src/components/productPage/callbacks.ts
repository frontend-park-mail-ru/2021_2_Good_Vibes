import bus from '../../init/bus';
import cart from '../../object/cart/cart';
import user from '../../object/user/user';
import { AjaxResponse, Callback, Comment, NewComment, Product } from '../../types';
import InfoCardBtn from './button/view';
import CommentsContainer from './commentsContainer/view';
import newCommentContainer from './newCommentContainer/view';

export const backToCategoryPage: Callback = () => {
  bus.emit('homepage state request', undefined);
};

export const changeBtn: Callback = () => {
  const addBtnParent = <HTMLButtonElement>document.getElementsByClassName('info-card-btn__cart')[0];

  const cartBtnElem = <HTMLButtonElement>document.createElement('button');
  cartBtnElem.className = 'info-card-btn__add-cart';
  cartBtnElem.innerHTML = 'Перейти в корзину';

  /*  const cartBtnElem = new InfoCardBtn(); */
  addBtnParent.replaceWith(cartBtnElem);
  cartBtnElem.addEventListener('click', (event) => {
    event.preventDefault();

    bus.emit('cart button click', undefined);
  });
};

export const changeBtnMobile: Callback = () => {
  const addBtnParent = <HTMLButtonElement>document.getElementsByClassName('info-card-mobile-btn__cart')[0];

  const cartBtnElem = <HTMLButtonElement>document.createElement('button');
  cartBtnElem.className = 'info-card-btn__add-cart';
  cartBtnElem.innerHTML = 'Перейти в корзину';

  /*  const cartBtnElem = new InfoCardBtn(); */
  addBtnParent.replaceWith(cartBtnElem);
  cartBtnElem.addEventListener('click', (event) => {
    event.preventDefault();

    bus.emit('cart button click', undefined);
  });
};

export const scrollToTop: Callback = () => {
  document.documentElement.scrollTop = 0;
};

export const productCheckInCart: Callback = (context: Product) => {
  if (cart.getItem(context.id)) {
    changeBtn(undefined);
  }
};

export const commentsRequest: Callback = (context: Product) => {
  const { id } = context;

  // console.log('product comments request', id);

  bus.emit('comments ajax request', { id });
};

export const renderCommentContainer: Callback = (comment: Comment) => {
  // console.log('render single comment block', comment);

  const commentContainer = new CommentsContainer(comment);
  document.getElementsByClassName('board-bottom')[0].appendChild(commentContainer.self);
};

// export const generateCommentsArray: Callback = (array: Comment[]) => {
//   // console.log('generate commenst array', array);

// array.forEach((comment) => {
//   renderCommentContainer(comment);
// });
// };

export const generateCommentsArray: Callback = (obj: { 'responseText': string }) => {
  // console.log('generate commenst array', array);

  const { responseText } = obj;

  Promise.resolve()
    .then(() => JSON.parse(responseText))
    .catch((err) => console.error(err))
    .then((parsedObj: Comment[]) => parsedObj.forEach((comment) => {
      renderCommentContainer(comment);
    }));
};

export const newCommentContainerShow: Callback = (context: Product) => {
  if (!user.isAutorize()) {
    newCommentContainer.hide();
    return;
  }

  console.log('new comment block add callback', context);
  newCommentContainer.setContext(context);
  newCommentContainer.show();
};

export const addCommentRequest: Callback = () => {
  const { id } = newCommentContainer.context;

  const ratingInput = <HTMLInputElement>newCommentContainer.self.getElementsByClassName('new-comment-rating')[0];
  const rating = +ratingInput.value;

  const textInput = <HTMLInputElement>newCommentContainer.self.getElementsByClassName('add-comment-text')[0];
  const text = textInput.value.trim();

  const comment: NewComment = {
    product_id: id,
    rating,
    text,
  };

  bus.emit('add comment request', comment);
};

export const showError: Callback = (error: string) => {
  const errorLabel = <HTMLLabelElement>document.getElementsByClassName('new-comment-alert-label')[0];
  errorLabel.textContent = error;
  errorLabel.style.visibility = 'visible';
};

export const hideError: Callback = (error: string) => {
  const errorLabel = <HTMLLabelElement>document.getElementsByClassName('new-comment-alert-label')[0];
  errorLabel.style.visibility = 'hidden';
};

export const handleResponse: Callback = (obj: { 'responseText': string }) => {
  const { responseText } = obj;
  Promise.resolve()
    .then(() => JSON.parse(responseText))
    .then((parsedObj) => {
      if (parsedObj['error description']) {
        showError(parsedObj['error description']);
        return;
      }
      renderCommentContainer(parsedObj);
    })
    .catch((err) => console.error(err))
};

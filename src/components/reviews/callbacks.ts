import bus from "../../modules/bus/bus";
import user from "../../services/user/user";
import CommentsContainer from "../productPage/commentsContainer/view";
import ReviewContainer from "./reviewsContainer/view";
import { Callback, Order, Comment, myReview, Product } from "../../types";

const commentMap: {
  [commentid: number]: {
    productId: number;
  };
} = {};

export const reviewsListRequest: Callback = () => {
  bus.emit("reviews list request", user.username);
};

export const generateCommentsArray: Callback = (obj: {
  responseText: string;
}) => {
  // console.log('generate commenst array', array);

  const { responseText } = obj;
  Promise.resolve()
    .then(() => JSON.parse(responseText))
    .catch((err) => console.error(err))
    .then((parsedObj: Comment[]) => {
      if (parsedObj.length === 0) {
        return;
      }
      return parsedObj.forEach((comment) => {
        bus.emit("product info by id for reviews", comment);
      });
    });
};

export const renderCommentContainer: Callback = (myReview: myReview) => {
  if (!commentMap[myReview.comment.product_id]) {
    const reviewContainer = new ReviewContainer(myReview);
    document
      .getElementsByClassName("comments-container")[0]
      .appendChild(reviewContainer?.self);
    commentMap[myReview.comment.product_id] = {
      productId: myReview.product.id,
    };
  }
  //const reviewContainer = new ReviewContainer(myReview)
  //document.getElementsByClassName('comments-container')[0].appendChild(reviewContainer?.self);
};

export const fieldsFill: Callback = () => {
  const userName = <HTMLImageElement>document.getElementsByClassName("b2n")[0];

  userName.textContent = user.username;
};

export const showAvatar: Callback = () => {
  const photo = <HTMLImageElement>document.getElementsByClassName("b2m5")[0];
  photo.style.backgroundImage = `url(${user.avatar})`;
};

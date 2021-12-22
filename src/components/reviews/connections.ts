import { Connection } from "../../types";
import { generateCommentsArray } from "../productPage/callbacks";
import * as reviews from "./callbacks";

const connections: Connection[] = [
  {
    event: "reviews shown",
    callback: [
        reviews.reviewsListRequest,
        reviews.fieldsFill,
        reviews.showAvatar,
    ]
  },
  {
    event: "reviews request confirmed",
    callback: reviews.generateCommentsArray,
  },
  {
    event: "product info review request success",
    callback: reviews.renderCommentContainer,
  },
];

export default connections;

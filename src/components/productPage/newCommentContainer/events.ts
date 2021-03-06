import bus from "../../../modules/bus/bus";
import { Product } from "../../../types";

const initEvents: (self: HTMLElement) => void = (self) => {
  // ---------------------------
  const addCommentBtn = <HTMLButtonElement>(
    self.getElementsByClassName("add-comment-btn")[0]
  );
  // addCommentBtn.addEventListener('click', () => {
  //   bus.emit('add comment button click', undefined);
  // });

  self.addEventListener("submit", (event) => {
    event.preventDefault();

    bus.emit("add comment button click", undefined);
  });

  const ratings = self.querySelectorAll(".comment-container");
  if (ratings.length > 0) {
    bus.emit("set rating", ratings);
  }
};

export default initEvents;

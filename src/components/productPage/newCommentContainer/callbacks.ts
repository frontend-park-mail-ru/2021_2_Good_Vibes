import bus from '../../../modules/bus/bus';
import { AjaxResponse, Callback } from '../../../types';

export const cleanInput: Callback = () => {

};
export const initRatings: Callback = (ratings: NodeListOf<Element>) => {
  let ratingTitle, ratingActive, ratingValue, ratingEstimate, ratingEstimateSpan;
  for (let index = 0; index < ratings.length; index++) {
    const rating = ratings[index];
    initRating(rating);
  }
  function initRating(rating) {
    initRatingVars(rating);

    setRatingActiveWidth();

    setRating(rating);

  }

  function initRatingVars(rating) {
    ratingTitle = rating.querySelector(".f9y9");
    ratingActive = rating.querySelector(".rating__active");
    ratingValue = rating.querySelector(".rating__value");
    ratingEstimate = rating.querySelector(".rating__estimate");
    ratingEstimateSpan = rating.querySelector(".rating__estimate_span");
  }

  function setRatingActiveWidth(index = ratingValue.innerHTML) {
    const ratingActiveWidth = index / 0.05;
    ratingActive.style.width = `${ratingActiveWidth}%`;
  }

  function setRating(rating) {
    const ratingItems = rating.querySelectorAll('.rating__item');
    for (let index = 0; index < ratingItems.length; index++) {
      const ratingItem = ratingItems[index];
      ratingItem.addEventListener("mouseenter", function (e) {
        initRatingVars(rating);
        setRatingActiveWidth(ratingItem.value);
      });
      ratingItem.addEventListener("mouseleave", function (e) {
        setRatingActiveWidth();
      });
      ratingItem.addEventListener("click", function (e) {
        initRatingVars(rating);

        ratingTitle.innerHTML = 'Ваша оценка: ';
        ratingEstimate.style.visibility = 'visible';
        ratingEstimate.innerHTML = ratingItem.getAttribute('aria-label');
        ratingValue.innerHTML = index + 1;
        setRatingActiveWidth();
      });
    }
  }
}

export const handleError: Callback = async ({ responseText }: AjaxResponse) => {
  const errorLabel = <HTMLLabelElement>document.getElementsByClassName('new-comment-alert-label')[0];

  try {
    const obj: { 'error code': number } = await JSON.parse(responseText);

    if (obj['error code'] === -21) {
      errorLabel.textContent = 'Нужно выбрать оценку товара и написать отзыв';
      errorLabel.style.visibility = 'visible';
      return;
    }

    if (obj['error code'] === -62) {
      errorLabel.textContent = 'Нельзя оставить больше одного отзыва на товар';
      errorLabel.style.visibility = 'visible';
      return;
    }

  } catch (err) {
    console.error(err);
  }

};

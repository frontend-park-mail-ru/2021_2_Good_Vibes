/* eslint-disable prefer-destructuring */
import searchParams from "../../services/search/params";
import { Callback, Product } from "../../types";

export const getParams: Callback = (array: Product[]) => {

  // debugger;

  const minPriceInput = <HTMLInputElement>document?.getElementsByClassName('search-filter-amount__from')[0];
  const maxPriceInput = <HTMLInputElement>document?.getElementsByClassName('search-filter-amount__to')[0];
  const minRatingInput = <HTMLInputElement>document?.getElementsByClassName('search-filter-rating__from')[0];
  const maxRatingInput = <HTMLInputElement>document?.getElementsByClassName('search-filter-rating__to')[0];


  if (+minPriceInput.value <= searchParams.minPriceStatic
    && minPriceInput.value != "") {
    minPriceInput.value = searchParams.minPriceStatic.toString();
  } else {
    minPriceInput.value = searchParams.minPrice.toString();
  }

  // if (+maxPriceInput.value >= searchParams.maxPriceStatic
  //   && minPriceInput.value != "") {
  //   maxPriceInput.value = searchParams.maxPriceStatic.toString();
  // } else {
  //   maxPriceInput.value = searchParams.maxPrice.toString();
  // }
  // minRatingInput.value = searchParams.minRating.toString();
  // maxRatingInput.value = searchParams.maxRating.toString();



  if (+maxPriceInput.value > searchParams.maxPriceStatic
    && minPriceInput.value != "") {
    maxPriceInput.value = searchParams.maxPriceStatic.toString();
  } else {
    maxPriceInput.value = searchParams.maxPrice.toString();
  }
  minRatingInput.value = searchParams.minRating.toString();
  maxRatingInput.value = searchParams.maxRating.toString();



  // minPriceInput.value = searchParams.minPrice.toString();
  // maxPriceInput.value = searchParams.maxPrice.toString();

  // minRatingInput.value = searchParams.minRating.toString();
  // maxRatingInput.value = searchParams.maxRating.toString();
};

export const setFiltersParams: Callback = () => {
  // console.log('setFiltersParams');

  // debugger;

  const minPriceInput = <HTMLInputElement>document?.getElementsByClassName('search-filter-amount__from')[0];
  const maxPriceInput = <HTMLInputElement>document?.getElementsByClassName('search-filter-amount__to')[0];
  const minRatingInput = <HTMLInputElement>document?.getElementsByClassName('search-filter-rating__from')[0];
  const maxRatingInput = <HTMLInputElement>document?.getElementsByClassName('search-filter-rating__to')[0];


  if (+minPriceInput.value < searchParams.minPriceStatic) {
    searchParams.minPrice = searchParams.minPriceStatic
    minPriceInput.value = searchParams.minPriceStatic.toString();
  } else {
    minPriceInput.value = searchParams.minPrice.toString();
  }

  if (+maxPriceInput.value > searchParams.maxPriceStatic) {
    searchParams.maxPrice = searchParams.maxPriceStatic
    maxPriceInput.value = searchParams.maxPriceStatic.toString();
  } else {
    maxPriceInput.value = searchParams.maxPrice.toString();
  }
  minRatingInput.value = searchParams.minRating.toString();
  maxRatingInput.value = searchParams.maxRating.toString();






  // minPriceInput.value = searchParams.minPrice.toString();
  // maxPriceInput.value = searchParams.maxPrice.toString();

  // minRatingInput.value = searchParams.minRating.toString();
  // maxRatingInput.value = searchParams.maxRating.toString();


};
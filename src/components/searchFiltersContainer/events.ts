import bus from '../../modules/bus/bus';
import searchParams from '../../services/search/params';

/* eslint-disable max-len */
const initEvents: (self: HTMLElement) => void = (self) => {
  const minPrice = <HTMLInputElement>self?.getElementsByClassName('search-filter-amount__from')[0];
  const maxPrice = <HTMLInputElement>self?.getElementsByClassName('search-filter-amount__to')[0];
  const minRating = <HTMLInputElement>self?.getElementsByClassName('search-filter-rating__from')[0];
  const maxRating = <HTMLInputElement>self?.getElementsByClassName('search-filter-rating__to')[0];

  const input: {
    minPrice: HTMLInputElement,
    maxPrice: HTMLInputElement,
    minRating: HTMLInputElement,
    maxRating: HTMLInputElement,
  } = {
    minPrice,
    maxPrice,
    minRating,
    maxRating,
  };

  // ----------------
  Object.values(input).forEach((inputElement) => {
    inputElement.addEventListener('input', (event) => {
      event.preventDefault();

      const a = <HTMLInputElement>event.target;
      const value = a.value;

      const b = value[value.length - 1];
      if (!b.match(/^\d+$/)) {
        a.value = value.slice(0, value.length - 1);
      }
    });
  });

  // ----------------
  Object.values(input).forEach((inputElement) => {
    inputElement.addEventListener('change', (event) => {
      event.preventDefault();

      if (+inputElement.value < 0) inputElement.value = '0';

      if (+input.minRating.value > 5) input.minRating.value = '5';
      if (+input.maxRating.value > 5) input.maxRating.value = '5';
    });
  });

  Object.entries(input).forEach(([key, inputElement]) => {
    inputElement.addEventListener('change', (event) => {
      event.preventDefault();
      searchParams[key] = +inputElement.value;

      // const currentCategory = window.location.search.match(/.*name=(\w+)/u)[1];

      const currentCategory = window.location.pathname.match(/\/category\/(.+)/u)[1];

      bus.emit('category ajax request', { name: currentCategory });
    });
  });
};

export default initEvents;

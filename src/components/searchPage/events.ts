import bus from '../../modules/bus/bus';
import searchParams from '../../services/search/params';

const initEvents: (self: HTMLElement) => void = (self) => {
  /*  document.addEventListener('scroll', (event) => {
     const windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
 
     if (windowRelativeBottom < document.documentElement.clientHeight + 100) {
       // console.log('blob');
       bus.emit('scroll to bottom', undefined);
     }
   }); */

  const priceToggle = self.querySelector("#sort-price-toggle");

  // console.warn(priceToggle);


  priceToggle.addEventListener("click", (event) => {
    const target = event.target as HTMLSpanElement;


    let status = target.getAttribute("data-status");
    switch (true) {
      case status === "asc":
        status = "desc";
        break;
      case status === "desc":
        status = "asc";
        break;
      case status === "off":
      default:
        status = "desc";
    }
    target.setAttribute("data-status", status);
    if (status === "asc" || status === "desc") {
      searchParams.type = status;
      searchParams.orderType = "price";

      // const currentCategory = window.location.pathname.match(/\/category\/(.+)/u)[1];
      // bus.emit('category ajax request', { name: currentCategory });

      // debugger;

      const currentStr = decodeURI(window.location.search).match(/.*str=([\w|а-яА-Я|\s]+).*/)[1];
      bus.emit('search ajax request', { str: currentStr });

      const ratingToggle = self.querySelector("#sort-rating-toggle") as HTMLSpanElement;
      ratingToggle.setAttribute("data-status", "off");
    }

    // debugger;
  })

  const ratingToggle = self.querySelector("#sort-rating-toggle");
  ratingToggle.addEventListener("click", (event) => {
    const target = event.target as HTMLSpanElement;
    let status = target.getAttribute("data-status");
    switch (true) {
      case status === "asc":
        status = "desc";
        break;
      case status === "desc":
        status = "asc";
        break;
      case status === "off":
      default:
        status = "desc";
    }
    target.setAttribute("data-status", status);
    if (status === "asc" || status === "desc") {
      searchParams.type = status;
      searchParams.orderType = "rating";

      // const currentCategory = window.location.pathname.match(/\/category\/(.+)/u)[1];
      // bus.emit('category ajax request', { name: currentCategory });

      // debugger;

      const currentStr = decodeURI(window.location.search).match(/.*str=([\w|а-яА-Я|\s]+).*/)[1];
      bus.emit('search ajax request', { str: currentStr });

      const priceToggle = self.querySelector("#sort-price-toggle") as HTMLSpanElement;
      priceToggle.setAttribute("data-status", "off");
    }

  })

  // console.warn('asdfasdf');
  // debugger


  // =================================

  // debugger

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

      // debugger;

      searchParams[key] = +inputElement.value;

      // const currentCategory = window.location.search.match(/.*name=(\w+)/u)[1];

      // const currentCategory = window.location.pathname.match(/\/category\/(.+)/u)[1];
      // bus.emit('search ajax request', { name: currentCategory });

      const currentStr = decodeURI(window.location.search).match(/.*str=([\w|а-яА-Я|\s]+).*/)[1];
      bus.emit('search ajax request', { str: currentStr });
    });
  });



};

export default initEvents;

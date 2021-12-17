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
  priceToggle?.addEventListener("click", (event) => {   
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
      const currentCategory = window.location.pathname.match(/\/category\/(.+)/u)[1];
      bus.emit('category ajax request', { name: currentCategory });
      const ratingToggle = self.querySelector("#sort-rating-toggle") as HTMLSpanElement;
      ratingToggle.setAttribute("data-status", "off");
    }
  })

  const ratingToggle = self.querySelector("#sort-rating-toggle");
  ratingToggle?.addEventListener("click", (event) => {   
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
      const currentCategory = window.location.pathname.match(/\/category\/(.+)/u)[1];
      bus.emit('category ajax request', { name: currentCategory });
      const priceToggle = self.querySelector("#sort-price-toggle") as HTMLSpanElement;
      priceToggle.setAttribute("data-status", "off");
    }
  })
};

export default initEvents;

import bus from "../modules/bus/bus";
import ajax from "../modules/rpc/ajax";
import {
  AjaxResponse,
  Callback,
  CartItem,
  NewComment,
  OrderRequest,
  ProductId,
  Suggests,
  Comment,
  Order,
} from "../types";
import searchParams from "../services/search/params";
import { response } from "express";
import cart from "../services/cart/cart";

// const backendAddress = 'https://ozonback.herokuapp.com';
// const backendAddress = 'http://37.139.33.76';
/*const backendAddress = 'https://goodvibesazot.tk/backend/api';*/
const backendAddress = "https://goodvibesazot.tk/api";

export const signin = (data) => {
  ajax
    .post({
      url: `${backendAddress}/login`,
      body: data,
    })
    .then((response: AjaxResponse) =>
      bus.emit("signIn ajax confirmed", response)
    )
    .catch((response: AjaxResponse) =>
      bus.emit("signIn ajax denied", response)
    );
};

export const signup = (data) => {
  ajax
    .post({
      url: `${backendAddress}/signup`,
      body: data,
    })
    .then((response: AjaxResponse) =>
      bus.emit("signUp ajax confirmed", response)
    )
    .catch((response: AjaxResponse) =>
      bus.emit("signUp ajax denied", response)
    );
};

export const signout = () => {
  ajax
    .get({
      url: `${backendAddress}/logout`,
    })
    .then(() => bus.emit("signout confirmed", undefined))
    .catch((error) => console.error(error));
};

export const profile = () => {
  ajax
    .get({
      url: `${backendAddress}/profile`,
    })
    .then((response: AjaxResponse) => bus.emit("authorization", undefined))
    .catch((response: AjaxResponse) => bus.emit("no authorization", undefined));
};

export const cookieCheck = () => {
  ajax
    .get({
      url: `${backendAddress}/profile`,
    })
    .then((response: AjaxResponse) =>
      bus.emit("cookie check success", response)
    )
    .catch((response: AjaxResponse) => bus.emit("cookie check fail", response))
    .then(() => bus.emit("cookie check finished", undefined));
};

export const productAdd = () => {
  ajax.get({
    url: `${backendAddress}/product/add`,
  });
};

export const homepage = () => {
  ajax
    .get({
      url: `${backendAddress}/homepage`,
    })
    .then((response: AjaxResponse) =>
      bus.emit("homepage ajax confirmed", response)
    )
    .catch((error) => console.error(error));
};

export const product: Callback = (obj: { id: number; price: number }) => {
  const { id, price } = obj;

  ajax
    .get({
      url: `${backendAddress}/product?id=${id}`,
    })
    .then(({ responseText }) =>
      bus.emit("product request confirmed", { responseText })
    )
    .catch(({ responseText }) =>
      bus.emit("product request denied", { responseText })
    );
};

export const productGet: Callback = (obj: { id: number; price: number }) => {
  const { id, price } = obj;

  ajax
    .get({
      url: `${backendAddress}/product?id=${id}`,
    })
    .then(({ responseText }) =>
      bus.emit("product get confirmed", { responseText })
    )
    .catch(({ responseText }) =>
      bus.emit("product get denied", { responseText })
    );
};

export const productInfoByIdForReview: Callback = (obj: Comment) => {

  ajax
    .get({
      url: `${backendAddress}/product?id=${obj.product_id}`,
    })
    .then(({ responseText }) =>
      bus.emit("product info review request success", { product: JSON.parse(responseText), comment: obj })
    )
    .catch(({ responseText }) =>
      bus.emit("product request denied", { responseText })
    );
};

export const productInfoByIdForOrdersList: Callback = ({ id }: { id: number }) => {

  ajax
    .get({
      url: `${backendAddress}/product?id=${id}`,
    })
    .then(({ responseText }) =>
      bus.emit("product info by id for orders list request success", { product: JSON.parse(responseText) })
    )
    .catch(({ responseText }) =>
      bus.emit("product request denied", { responseText })
    );
};



export const productArrayRequest: Callback = (array: CartItem[]) => {
  const result = [];
  console.log(array);

  array.forEach((element) => {
    ajax
      .get({
        url: `${backendAddress}/product?id=${element.product_id}`,
      })
      .then(({ responseText }) => JSON.parse(responseText))
      .then((obj) => result.push(obj))
      .then(() => {
        if (result.length === array.length) {
          bus.emit("product array request confirmed", result);
        }
      })
      .catch(({ responseText }) =>
        bus.emit("product array request denied", responseText)
      );
  });
};

export const order = () => {
  ajax
    .get({
      url: `${backendAddress}/cart/confirm`,
    })
    .then(({ responseText }) => bus.emit("order response", responseText))
    .catch((error) => console.error(error));
};

export const putProductToCart: Callback = (obj: {
  id: number;
  number: number;
  price: number;
}) => {
  const { id, number, price } = obj;
  const temp = {
    product_id: id,
    number,
    product_price: price,
  };

  ajax
    .post({
      url: `${backendAddress}/cart/put`,
      body: temp,
    })
    .then((response: AjaxResponse) =>
      bus.emit("put product to cart confirmed", response)
    )
    .catch((response: AjaxResponse) =>
      bus.emit("put product to cart denied", response)
    );
};

export const cartGet = () => {
  ajax
    .get({
      url: `${backendAddress}/cart/get`,
    })
    .then(({ responseText }) =>
      bus.emit("cart get confirmed", { responseText })
    )
    .catch(({ responseText }) => bus.emit("cart get denied", { responseText }))
    .then(() => bus.emit("cart get finished", undefined));
};

export const cartConfirm: Callback = (obj: OrderRequest) => {

  if (cart.getPromo !== '') {
    obj.promocode = cart.getPromo;
  }

  ajax
    .post({
      url: `${backendAddress}/cart/confirm`,
      body: obj,
    })
    .then(({ responseText }) => bus.emit("order confirmed", responseText))
    .catch(({ responseText }) => bus.emit("order denied", responseText));
};

export const categoryGet: Callback = () => {
  ajax
    .get({
      url: `${backendAddress}/category`,
    })

    .then((response: Response) => bus.emit("category get confirmed", response))
    .catch((response: Response) => bus.emit("category get denied", response))
    .then(() => bus.emit("category get finished", undefined));
};



// export const categoryRequest: Callback = (obj: { name: string }) => {
//   const { name } = obj;

//   const {
//     minPrice,
//     maxPrice,
//     maxRating,
//     minRating,
//     type,
//     orderType,
//   } = searchParams;

//   ajax.get({
//     // url: `${backendAddress}/category/${name}`,
//     url: `${backendAddress}/category/${name}?price_min=${minPrice}&price_max=${maxPrice}&rating_min=${minRating}&rating_max=${maxRating}&order=${orderType}&order_type=${type}`,
//   })

//     .then((response: AjaxResponse) => bus.emit('category ajax confirmed', response))
//     .then(() => bus.emit('category ajax name', obj))
//     .catch((response: AjaxResponse) => bus.emit('category ajax denied', response));
// };

export const categoryRequest: Callback = (obj: {
  name: string;
  pathname: string;
  search?: boolean;
}) => {
  const { name, pathname } = obj;
  let { search } = obj;
  if (!search) search = false;
  console.log(obj);
  if (searchParams.categoryName != name) {
    searchParams.setDefault();
  }
  searchParams.categoryName = name;
  const { minPrice, maxPrice, maxRating, minRating, type, orderType } =
    searchParams;

  console.log("pathname", pathname);

  ajax
    .get({
      // url: `${backendAddress}/category/${name}`,

      url: `${backendAddress}/category/${name}?price_min=${minPrice}&price_max=${maxPrice}&rating_min=${minRating}&rating_max=${maxRating}&order=${orderType}&order_type=${type}&search=${search}`,

      // url: `${backendAddress}${pathname}?price_min=${minPrice}&price_max=${maxPrice}&rating_min=${minRating}&rating_max=${maxRating}&order=${orderType}&order_type=${type}`,
    })

    .then((response: AjaxResponse) =>
      bus.emit("category ajax confirmed", response)
    )
    .then(() => bus.emit("category ajax name", obj))
    .catch((response: AjaxResponse) =>
      bus.emit("category ajax denied", response)
    );
};

export const cartDelete: Callback = (obj: {
  id: number;
  number: number;
  price: number;
}) => {
  // console.log('cart delete', obj);

  const { id, number, price } = obj;
  const temp = {
    product_id: id,
    number,
    product_price: price,
  };

  ajax
    .post({
      url: `${backendAddress}/cart/delete`,
      body: temp,
    })
    .then((response: AjaxResponse) =>
      bus.emit("delete product from cart confirmed", response)
    )
    .catch((response: AjaxResponse) =>
      bus.emit("delete product from cart denied", response)
    );
};

export const profileUpload: Callback = (obj: {
  username: string;
  email: string;
}) => {
  ajax
    .post({
      url: `${backendAddress}/profile`,
      body: obj,
    })
    .then((response: AjaxResponse) =>
      bus.emit("profile upload confirmed", response)
    )
    .catch((response: AjaxResponse) =>
      bus.emit("profile upload denied", response)
    );
};

export const avatarUpload: Callback = (file: File) => {
  ajax.avatarUpload({
    method: "POST",
    url: `${backendAddress}/upload/avatar`,
    file,
    callback: (response: AjaxResponse) => {
      const { status } = response;

      if (status < 300) {
        bus.emit("avatar upload confirmed", response);
        return;
      }
      bus.emit("avatar upload denied", response);
    },
  });
};

export const orderList: Callback = () => {
  console.log('orderList ajax request');
  ajax
    .get({
      url: `${backendAddress}/profile/orders`,
    })

    .then((response: AjaxResponse) =>
      bus.emit("orders list confirmed", response)
    )
    .catch((response: AjaxResponse) =>
      bus.emit("orders list denied", response)
    );
};

export const reviewsRequestList: Callback = (username: string) => {
  ajax
    .get({
      url: `${backendAddress}/user/reviews?name=${username}`
    })
    .then((response: AjaxResponse) =>
      bus.emit('reviews request confirmed', response)
    )
    .catch((response: AjaxResponse) =>
      console.log(response)
    );
}

// =======================
export const comments: Callback = (obj: { id: number }) => {
  const { id } = obj;

  // console.log('ajax comments request', id);

  // const fakeAfComments = [
  //   {
  //     username: 'user1',
  //     rating: 4,
  //     text: 'user1 fakeaf comment text',
  //   },
  //   {
  //     username: 'user2',
  //     rating: 2,
  //     text: 'user2 fakeaf comment text',
  //   },
  // ];

  ajax
    .get({
      url: `${backendAddress}/reviews?product_id=${id}`,
    })

    // .then((response: AjaxResponse) => console.log('comments request confirmed', response))
    // .catch((response: AjaxResponse) => console.log('comments request denied', response))

    .then((response: AjaxResponse) =>
      bus.emit("comments request confirmed", response)
    )
    .catch((response: AjaxResponse) =>
      bus.emit("comments request denied", response)
    );

  // .then(() => bus.emit('comments request confirmed', fakeAfComments));
};

const fakeafSuggests: Suggests = {
  products: [
    {
      name: "product 1",
      id: 863,
      image: "empty",
    },
    {
      name: "product 2",
      id: 876,
      image: "empty",
    },
  ],
  categories: [
    {
      name: "CLOTHES_MEN",
      description: "category 1",
    },
    {
      name: "WATCHES",
      description: "category 2",
    },
  ],
};

export const suggests: Callback = (obj: { str: string }) => {
  const { str } = obj;
  // console.log(str);

  ajax
    .get({
      url: `${backendAddress}/search/suggest?str=${str}`,
    })
    .then((response: AjaxResponse) =>
      bus.emit("suggest request confirmed", response)
    )
    .catch((response: AjaxResponse) =>
      bus.emit("suggest request denied", response)
    );
};

export const search: Callback = (obj: { str: string, search?: boolean }) => {
  const { str } = obj;

  // debugger;


  const { minPrice, maxPrice, maxRating, minRating, type, orderType } =
    searchParams;

  let { search } = obj;
  if (!search) search = false;


  ajax
    .get({
      // url: `${backendAddress}/search?str=${str}`,
      url: `${backendAddress}/search?str=${str}&price_min=${minPrice}&price_max=${maxPrice}&rating_min=${minRating}&rating_max=${maxRating}&order=${orderType}&order_type=${type}&search=${search}`,

    })
    .then((response: AjaxResponse) =>
      bus.emit("search state confirmed", { pathname: '/search', str, ...response })
    )
    .catch((response: AjaxResponse) =>
      bus.emit("search state denied", response)
    );
};

export const addComment: Callback = (obj: NewComment) => {
  // console.log('add comment ajax request', obj);

  ajax
    .post({
      url: `${backendAddress}/review/add`,
      body: obj,
    })
    .then((response: AjaxResponse) =>
      bus.emit("add comment request confirmed", response)
    )
    .catch((response: AjaxResponse) =>
      bus.emit("add comment request denied", response)
    );
};

export const recommendations: Callback = () => {
  console.log("ajax recommendations callback");
  ajax
    .get({
      url: `${backendAddress}/profile/recommend`,
    })
    .then((response: AjaxResponse) =>
      bus.emit("ajax recommendations confirmed", response)
    )
    .catch((response: AjaxResponse) =>
      bus.emit("ajax recommendations denied", response)
    );
};


export const cartConfirmPromo: Callback = (obj: OrderRequest) => {
  ajax
    .post({
      url: `${backendAddress}/cart/check`,
      body: obj,
    })
    .then(({ responseText }) => bus.emit("order confirmed promo", responseText))
    .catch(({ responseText }) => bus.emit("order denied promo", responseText));
};

export const cartGetPromo = () => {
  ajax
    .get({
      url: `${backendAddress}/cart/check`,
    })
    .then(({ responseText }) =>
      bus.emit("cart get confirmed promo", { responseText })
    )
    .catch(({ responseText }) => bus.emit("cart get denied promo", { responseText }))
    .then(() => bus.emit("cart get finished promo", undefined));
};

export const favorite: Callback = () => {
  console.log("ajax favoriteProductGet callback");
  ajax
    .get({
      url: `${backendAddress}/product/favorite/get`,
    })
    .then((response: AjaxResponse) =>
      bus.emit("favorite ajax confirmed", response)
    )
    .catch((response: AjaxResponse) =>
      bus.emit("favorite ajax denied", response)
    );
};

export const brands: Callback = () => {
  console.log("ajax brands callback");
  ajax
    .get({
      url: `${backendAddress}/brands/get`,
    })
    .then((response: AjaxResponse) =>
      bus.emit("brands ajax confirmed", response)
    )
    .catch((response: AjaxResponse) =>
      bus.emit("brands ajax denied", response)
    );
};

export const newest: Callback = () => {
  console.log("ajax newestProductGet callback");
  ajax
    .get({
      url: `${backendAddress}/product/new/get`,
    })
    .then((response: AjaxResponse) =>
      bus.emit("newest ajax confirmed", response)
    )
    .catch((response: AjaxResponse) =>
      bus.emit("newest ajax denied", response)
    );
};

export const brandProducts: Callback = (obj: { name: string, id: number }) => {
  const { name, id } = obj;
  console.log("ajax newestProductGet callback");
  ajax
    .get({
      // url: `${backendAddress}/brand/products?name=${name}`,
      url: `${backendAddress}/brand/products?id=${id}`,
    })
    .then((response: AjaxResponse) =>
      bus.emit("brands product ajax confirmed", { ...response, id })
    )
    .catch((response: AjaxResponse) =>
      bus.emit("brands product ajax denied", response)
    );
};


export const sales: Callback = () => {
  console.log("ajax sales callback");
  ajax
    .get({
      url: `${backendAddress}/sales`,
    })
    .then((response: AjaxResponse) =>
      bus.emit("sales ajax confirmed", response)
    )
    .catch((response: AjaxResponse) =>
      bus.emit("sales ajax denied", response)
    );
};


export const addProductFavorite: Callback = (obj: { 'id': number }) => {
  console.log("ajax addProductFavorite callback");
  ajax
    .post({
      url: `${backendAddress}/product/favorite/add`,
      body: obj,
    })
    .then((response: AjaxResponse) => {
      const obj = JSON.parse(response.responseText);
      // bus.emit("add favorite ajax confirmed", { id: obj.id })
      bus.emit("add favorite ajax confirmed", obj)
    })
    .catch((response: AjaxResponse) =>
      console.log("add favorite product bad")
    )
}

export const delProductFavorite: Callback = (obj: { 'id': number }) => {
  console.log("ajax delProductFavorite callback");
  ajax
    .post({
      url: `${backendAddress}/product/favorite/delete`,
      body: obj,
    })

    .then((response: AjaxResponse) => {
      const obj = JSON.parse(response.responseText);
      bus.emit("del favorite ajax confirmed", { id: obj.id })
    })

    .catch((response: AjaxResponse) =>
      console.log("del favorite product bad")
    )
}

export const cartCheck: Callback = (obj: OrderRequest) => {
  ajax.post({
    url: `${backendAddress}/cart/check`,
    body: obj,
  })

    .then((response: AjaxResponse) => JSON.parse(response.responseText))
    .then((obj: Order) => {
      if (obj.cost_with_promo === obj.cost) {
        bus.emit('promo not valid', undefined);
        return;
      }

      bus.emit('promo valid', obj);
    })
    .catch((err) => console.error('cart check error: ', err));
}
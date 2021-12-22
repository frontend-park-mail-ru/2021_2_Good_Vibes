export type Callback = (arg0: any) => void;

export type Connection = {
  event: string,
  callback: (Callback | Callback[])
};

export interface ViewInterface {
  self: HTMLElement;
  isActive(): boolean;
  hide(): void;
  show(): void;
  delete(): void;
  setContext(context: Product): void;
  render(): Promise<void>;
}

export interface ConstructorInterface {
  new(classId: string): ViewInterface;
}

export type AjaxResponse = {
  'responseText': string,
  'status': number,
};

export type CartItem = {
  'product_id': number,
  'number': number,
  'product_price': number,
};

export type Product = {
  category: string,
  count_in_stock: number,
  description: string,
  id: number,
  image: string | string[],
  name: string,
  price: number,
  rating: number,
  is_favourite: boolean,
  nameBtn: string,
  product_id?: number,
};

export type Brand = {
  name: string,
  image: string | string[],
  id: number,
};

export type ProductId = {
  id: number,
};

export type Address = {
  'country': string,
  'city': string,
  'index': string,
  'street': string,

  'region'?: string,
  'house'?: string,
  'flat'?: string,
};

export type OrderRequest = {
  'address'?: Address,
  'products': CartItem[],
  'promocode'?: string,
  'email'?: string,
};

export type Order = {
  'address': Address,
  'cost': number,
  'date': string,
  'order_id': number,
  'products': Product[],
  'status': string,
  'email'?: string,
  'cost_with_promo'?: number,
  'promocode'?: string;
};

export type Category = {
  'name': string,
  'description'?: string
  'children'?: Category[],
};

export type CategoryResponseObject = {
  'products': Product[],
  'min_price': number
  'max_price': number,
};

export type Comment = {
  'username': string,
  'rating': number,
  'text': string,
  'product_id': number,
};

export type myReview = {
  comment: Comment,
  product: Product,
};

export type myOrder = {
  'address': Address,
  'cost': number,
  'date': string,
  'order_id': number,
  'products': Product[],
  'status': string,
  'email'?: string,
  'cost_with_promo'?: number,
  'promocode'?: string;
};

export type ProductSuggest = {
  'id': number,
  'name': string,
  'image': string,
};

export type CategorySuggest = {
  'name': string,
  'description': string,
};

export type Suggests = {
  'products': ProductSuggest[],
  'categories': CategorySuggest[],
};

export type NewComment = {
  product_id: number,
  rating: number,
  text: string,
};

export type SearchParamsType = {
  minPrice: number,
  maxPrice: number,
  minRating: number,
  maxRating: number,
  type: 'asc' | 'desc',
  orderType: 'rating' | 'price',
};

// export type CartProduct = {
//   description: "Крутые желтые кроссовки"
//   image: "https://products-bucket-ozon-good-vibes.s3.eu-west-1.amazonaws.com/b2810c77-186e-479d-8962-a885d41164cd"
//   name: "https://products-bucket-ozon-good-vibes.s3.eu-west-1.amazonaws.com/b2810c77-186e-479d-8962-a885d41164cd"
//   number: 1
//   order_id: 280
//   price: 10000
//   product_id: 867
//   rating: 5
// }
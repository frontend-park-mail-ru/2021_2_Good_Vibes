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
  image: string,
  name: string,
  price: number,
  rating: number,
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
  'address': Address,
  'products': CartItem[],
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

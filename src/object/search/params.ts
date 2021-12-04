const DEFAULT_MAX_PRICE = 100000000;

const searchParams: {
  minPrice: number,
  maxPrice: number,
  minRating: number,
  maxRating: number,
  type: 'asc' | 'desc',
  orderType: 'rating' | 'price',

  setDefault: () => void,
} = {
  minPrice: 0,
  maxPrice: DEFAULT_MAX_PRICE,
  minRating: 0,
  maxRating: 5,
  type: 'asc',
  orderType: 'price',

  setDefault: () => {
    searchParams.minPrice = 0;
    searchParams.maxPrice = DEFAULT_MAX_PRICE;
    searchParams.minRating = 0;
    searchParams.maxRating = 5;
    searchParams.type = 'asc';
    searchParams.orderType = 'price';
  },
};

export default searchParams;

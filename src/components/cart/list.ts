import { Product } from '../../types';
import CartItemClass from './item/view';

class ProductCardList {
  public list: {
    [id: number]: {
      'context': Product,
      'view': CartItemClass,
    }
  } = {};

  public views: CartItemClass[] = [];

  private addArray(array: Product[]) {
    array.forEach((productContext) => {
      this.add(productContext);
    });
  }

  private add(productContext: Product) {
    if (!this.list[productContext.id]) {
      this.create(productContext);
      return;
    }

    this.modify(productContext);
  }

  private create(productContext: Product) {
    const productCard = new CartItemClass(productContext);
    this.list[productContext.id] = {
      context: productContext,
      view: productCard,
    };
  }

  private modify(productContext: Product) {
    const { view } = this.list[productContext.id];
    view.setContext(productContext);
    view.render();
  }

  public viewArray(array: Product[]): CartItemClass[] {
    this.views = [];

    this.addArray(array);

    array.sort((a, b) => a.id - b.id);

    array.forEach((productContext) => {
      this.views.push(this.list[productContext.id].view);
    });
    return this.views;
  }

  public deleteItem(id: number) {
    delete this.list[id];
  }
}

export default new ProductCardList();

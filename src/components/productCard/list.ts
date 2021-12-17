import { Product } from '../../types';
import ProductCard from './view';

class ProductCardList {
  private list: {
    [id: number]: {
      'context': Product,
      'view': ProductCard,
    }
  } = {};

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

    if (JSON.stringify(this.list[productContext.id].context) === JSON.stringify(productContext)) {
      return;
    }

    this.modify(productContext);
  }

  private create(productContext: Product) {
    const productCard = new ProductCard('product', productContext);
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

  public viewArray(array: Product[]): ProductCard[] {
    const result: ProductCard[] = [];

    this.addArray(array);
    array.forEach((productContext) => {
      result.push(this.list[productContext.id].view);
    });

    return result;
  }
}

export default new ProductCardList();

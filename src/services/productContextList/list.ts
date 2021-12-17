import { Product } from '../../types';

class ProductContextList {
  private list: { [id: number]: Product } = {};

  public addArray(array: Product[]) {
    array.forEach((context) => {
      this.add({ context });
    });
  }

  public add(obj: { 'context': Product }) {
    const { context } = obj;
    if (!this.list[context.id]) {
      this.list[context.id] = context;
      return;
    }

    if (JSON.stringify(context) !== JSON.stringify(this.list[context.id])) {
      this.modify(context);
    }
  }

  private modify(context: Product) {
    this.list[context.id] = context;
  }

  public get() {
    return this.list;
  }
}

export default new ProductContextList();

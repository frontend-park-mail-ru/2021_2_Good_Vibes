import { AjaxProduct } from '../../types';

class Cart {
  private self: AjaxProduct[] = [];

  private created = false;

  public load(obj: AjaxProduct[]) {
    this.created = true;

    this.self = obj;
  }

  public set(obj: { id: number, number: number }) {
    const { id, number } = obj;

    const target = this.self.find((elem) => elem.product_id === id);
    if (!target) {
      this.self.push({
        product_id: id,
        number,
      });
    } else {
      target.number = number;
    }
  }

  public add(obj: { id: number, number: number }) {
    const { id, number } = obj;

    const target = this.self.find((elem) => elem.product_id === id);
    if (!target) {
      this.self.push({
        product_id: id,
        number,
      });
    } else {
      target.number += number;
    }
  }

  public delete(obj: { id: number, number: number }) {
    const { id, number } = obj;

    const target = this.self.find((elem) => elem.product_id === id);

    if (target) {
      target.number -= number;

      if (target.number <= 0) {
        const idx = this.self.findIndex((elem) => elem.product_id === id);
        this.self.splice(idx, 1);
      }
    }
  }

  public drop() {
    this.created = false;
    this.self = [];
  }

  public get() {
    return this.self;
  }

  public isCreated() {
    return this.created;
  }
}

export default new Cart();

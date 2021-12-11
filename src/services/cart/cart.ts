import { CartItem } from '../../types';

class Cart {
  private self: CartItem[] = [];

  private confirmed = false;

  constructor() {
    this.localLoad();
  }

  public isConfirmed() {
    return this.confirmed;
  }

  public setConfirmed(confirmed: boolean) {
    this.confirmed = confirmed;
  }

  public load(obj: CartItem[]) {
    if (obj && obj.length !== 0) {
      this.self = obj;
      this.localSave();
      return;
    }

    obj.forEach((item) => {
      this.add({
        id: item.product_id,
        number: item.number,
      });
    });
  }

  public set(obj: { id: number, number: number }) {
    const { id, number } = obj;

    const target = this.getItem(id);
    if (!target) {
      this.self.push({
        product_id: id,
        number,
      });
    } else {
      target.number = number;
    }

    this.localSave();
  }

  public add(obj: { id: number, number: number }) {
    const { id, number } = obj;

    const target = this.getItem(id);
    if (!target) {
      this.self.push({
        product_id: id,
        number,
      });
    } else {
      target.number += number;
    }

    this.localSave();
  }

  public delete(obj: { id: number, number: number }) {
    const { id, number } = obj;

    const target = this.getItem(id);

    if (target) {
      target.number -= number;

      if (target.number <= 0) {
        const idx = this.self.findIndex((elem) => elem.product_id === id);
        this.self.splice(idx, 1);
      }
    }

    this.localSave();
  }

  public drop() {
    this.self = [];
    this.confirmed = false;

    this.localSave();
  }

  public get() {
    return this.self;
  }

  public getItem(id: number): CartItem {
    return this.self.find((elem) => elem.product_id === id);
  }

  public isEmpty(): boolean {
    if (this.self.length !== 0) {
      return false;
    }
    return true;
  }

  private localSave() {
    localStorage.setItem('cartItems', JSON.stringify(this.self));
  }

  private localLoad() {
    this.self = localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [];
  }
}

export default new Cart();

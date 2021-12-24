import bus from '../../modules/bus/bus';
import { Callback, CartItem, Product } from '../../types';

class Cart {
  private self: CartItem[] = [];
  private promo: string;
  private favorite: Product[] = [];

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
        price: item.product_price,
      });
    });
  }

  public set(obj: { id: number, number: number, price: number }) {
    const { id, number, price } = obj;

    const target = this.getItem(id);
    if (!target) {
      this.self.push({
        product_id: id,
        number,
        product_price: price,
      });
    } else {
      target.number = number;
    }

    this.localSave();
  }

  public add(obj: { id: number, number: number, price: number }) {
    const { id, number, price } = obj;

    const target = this.getItem(id);
    if (!target) {
      this.self.push({
        product_id: id,
        number,
        product_price: price,
      });
    } else {
      target.number += number;
    }

    this.localSave();
  }

  public delete(obj: { id: number, number: number, price: number }) {
    const { id, number, price } = obj;

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

  set setPromo(promo: string) {
    this.promo = promo;
  }

  get getPromo() {
    return this.promo;
  }

  // -------------------------

  public addToFavorite: Callback = (prod: Product) => {
    let flag = false;
    this.favorite.map(item => {
      if (item.id === prod.id) {
        flag = true;
      }
    });
    if (flag) {
      return;
    }

    this.favorite.push(prod);
    localStorage.setItem('faviroteItems', JSON.stringify(this.favorite));
  }

  public dropFavorite: Callback = () => {
    this.favorite = [];
    localStorage.setItem('faviroteItems', JSON.stringify(this.favorite));
  }

  public deleteFromFavorite: Callback = ({ id }: { id: number }) => {
    const idx = this.favorite.findIndex(item => item.id === id);

    console.warn(idx);

    if (idx !== -1) {
      this.favorite.splice(idx, 1);
    }
    localStorage.setItem('faviroteItems', JSON.stringify(this.favorite));
  }
}

export default new Cart();

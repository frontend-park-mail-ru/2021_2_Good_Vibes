import { Brand } from '../../types';
import BrandCard from './view';

class BrandCardList {
  private list: {
    [name: string]: {
      'context': Brand,
      'view': BrandCard,
    }
  } = {};

  private addArray(array: Brand[]) {
    array.forEach((brandContext) => {
      this.add(brandContext);
    });
  }

  private add(brandContext: Brand) {
    if (!this.list[brandContext.name]) {
      this.create(brandContext);
      return;
    }

    if (JSON.stringify(this.list[brandContext.name].context) === JSON.stringify(brandContext)) {
      return;
    }

    this.modify(brandContext);
  }

  private create(brandContext: Brand) {
    const brandCard = new BrandCard('brand', brandContext);
    this.list[brandContext.name] = {
      context: brandContext,
      view: brandCard,
    };
  }

  private modify(brandContext: Brand) {
    const { view } = this.list[brandContext.name];
    view.setContext(brandContext);
    view.render();
  }

  public viewArray(array: Brand[]): BrandCard[] {
    const result: BrandCard[] = [];
    this.addArray(array);
    array.forEach((brandContext) => {
      result.push(this.list[brandContext.name].view);
    });

    return result;
  }
}

export default new BrandCardList();

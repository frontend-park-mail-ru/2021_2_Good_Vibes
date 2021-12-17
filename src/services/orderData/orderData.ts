import { Address } from '../../types';

class OrderData {
  public address: Address = {
    country: 'country',
    city: 'city',
    index: 'index',
    street: 'street',

    region: 'region',
    house: 'house',
    flat: 'flat',
  };

  public payMethod: string;
  public userEmail: string;

  public setAddress(obj: Address) {
    this.address.country = obj.country;
    this.address.city = obj.city;
    this.address.index = obj.index;
    this.address.street = obj.street;
  }
}

export default new OrderData();

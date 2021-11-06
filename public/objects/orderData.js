class OrderData {
  #address = {
    country: 'country',
    city: 'city',
    index: 'index',
    street: 'street',

    region: 'region',
    house: 'house',
    flat: 'flat'
  }

  #payMethod;

  setAddress(obj) {
    this.#address.country = obj.country;
    this.#address.city = obj.city;
    this.#address.index = obj.index;
    this.#address.street = obj.street;
  }

  getAddress() {
    return this.#address;
  }

  setPayMethod(method) {
    this.#payMethod = method;
  }

  getPayMethod() {
    return this.#payMethod;
  }
}

export default new OrderData();

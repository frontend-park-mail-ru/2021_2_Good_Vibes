class EventBus {
  #listeners;

  constructor() {
    this.#listeners = {};
  }

  on(event, callback) {
    this.#listeners[event] = this.#listeners[event] || [];

    if (this.#listeners[event].includes(callback)) {
      return;
    }

    this.#listeners[event].push(callback);
  }

  off(event, callback) {
    this.#listeners[event] = this.#listeners[event]
      .filter((listener) => listener !== callback);
  }

  emit(event, data) {
    if (!this.#listeners[event]) {
      console.log(`${event} without listeners`);
      return;
    }
    this.#listeners[event].forEach((listener) => listener(data));
  }

  add(array) {
    array.forEach(({ event, callback }) => {
      if (Array.isArray(callback)) {
        callback.forEach((callbackItem) => {
          this.on(event, callbackItem);
        });
        return;
      }
      this.on(event, callback);
    });
  }

  delete(array) {
    array.forEach(({ event, callback }) => {
      if (Array.isArray(callback)) {
        callback.forEach((callbackItem) => {
          this.off(event, callbackItem);
        });
        return;
      }
      this.off(event, callback);
    });
  }
}

export default new EventBus();

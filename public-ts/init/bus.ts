import { Callback, Connection } from '../types';

class EventBus {
  private listeners: { [event: string]: Callback[] } = {};

  public on(event: string, callback: Callback) {
    this.listeners[event] = this.listeners[event] || [];

    if (this.listeners[event].includes(callback)) {
      return;
    }

    this.listeners[event].push(callback);
  }

  public off(event: string, callback: Callback) {
    this.listeners[event] = this.listeners[event]
      .filter((listener) => listener !== callback);
  }

  public emit(event: string, data: object) {
    if (!this.listeners[event]) {
      console.log(`${event} without listeners`);
      return;
    }

    this.listeners[event].forEach((listener) => listener(data));
  }

  public add(array: Connection[]) {
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

  public delete(array: Connection[]) {
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

import { Callback, Connection } from '../types';
import { isDebug } from  '@utils/isDebug';

class EventBus {
  private listeners: { [event: string]: Callback[] } = {};

  public on(event: string, callback: Callback) {
    this.listeners[event] = this.listeners[event] || [];

    if (this.listeners[event].includes(callback)) {
      return;
    }

    if (isDebug()) {
      console.log("[on]", event)
    }

    this.listeners[event].push(callback);
  }

  public off(event: string, callback: Callback) {
    if (isDebug()) {
      console.log("[off]", event)
    }
    this.listeners[event] = this.listeners[event]
      .filter((listener) => listener !== callback);
  }

  public emit(event: string, data: any) {
    if (!this.listeners[event]) {
      console.log(`${event} event without listeners`);
      return;
    }

    if (isDebug()) {
      console.log("[emit]", event)
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

import bus from "../../../modules/bus/bus";

const initEvents: (self: HTMLElement, id: number) => void = (self, id) => {
  const link = <HTMLAnchorElement>self.getElementsByTagName('a')[0];
  link.onclick = (event) => {
    event.preventDefault();

    bus.emit('product state request', { id });
  }
};

export default initEvents;
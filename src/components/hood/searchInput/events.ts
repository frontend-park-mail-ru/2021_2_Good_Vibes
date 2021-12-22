import bus from '../../../modules/bus/bus';
import debounce from '../../../modules/debounce/debounce';

const initEvents: (self: HTMLElement) => void = (self) => {
  const searchInput = <HTMLInputElement>self.getElementsByTagName('input')[0];
  const searchBtn = <HTMLButtonElement>self.getElementsByClassName('search-btn')[0];

  const debouncedBusEmit = debounce(bus.emit, bus, 500);

  // -----------------------
  searchInput.addEventListener('focus', (event) => {
    event.preventDefault();

    const str = searchInput.value.trim();

    bus.emit('suggests ajax request', { str });
  });

  // -----------------------
  self.addEventListener('submit', (event) => {
    event.preventDefault();

    const str = searchInput.value.trim();
    if (!str) {
      return;
    }

    bus.emit('search state request', { str });

    // bus.emit('delete suggests list', undefined);
    debouncedBusEmit('delete suggests list', undefined);

    searchInput.blur();
  });

  // -----------------------


  searchInput.addEventListener('input', (event) => {
    event.preventDefault();
    const str = searchInput.value;

    debouncedBusEmit('suggests ajax request', { str });
  });

  // ----------------------
  document.addEventListener('click', (event) => {
    // event.preventDefault();

    const targetNode = <Node>event.target;
    const searchInputNode = <Node>self.getElementsByTagName('input')[0];

    // console.log(targetNode);

    if (searchInputNode.contains(targetNode)) return;
    bus.emit('delete suggests list', undefined);
  });

  // ----------------------
  document.addEventListener('blur', (event) => {
    event.preventDefault();

    // console.log('blur');
  });
};

export default initEvents;

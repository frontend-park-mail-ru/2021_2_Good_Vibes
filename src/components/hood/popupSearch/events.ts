import bus from '../../../modules/bus/bus';
import debounce from '../../../modules/debounce/debounce';

const initEvents: (self: HTMLElement) => void = (self) => {
  const searchInput = <HTMLInputElement>self.getElementsByTagName('input')[0];
  const searchBtn = <HTMLButtonElement>self.getElementsByClassName('search-btn')[0];

  // -----------------------
  searchInput.addEventListener('focus', (event) => {
    event.preventDefault();

    const str = searchInput.value.trim();
    // console.log('search input value', str);
    bus.emit('suggests ajax request', { str });
  });

  // -----------------------
  self.addEventListener('submit', (event) => {
    event.preventDefault();

    const str = searchInput.value.trim();
    if (!str) {
      return;
    }
    // console.log('!!! submit', str);
    // bus.emit('search ajax request', { str });
    bus.emit('search state request', { str });
    bus.emit('close button click', undefined);
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
  const closeBtn = <HTMLElement>self.getElementsByClassName('popup-search__cancel')[0];
  closeBtn.addEventListener('click', (event) => {
    event.preventDefault();

    bus.emit('close button click', undefined);
  });

  // -----------------------

  const debouncedBusEmit = debounce(bus.emit, bus, 500);

  searchInput.addEventListener('input', (event) => {
    event.preventDefault();

    const str = searchInput.value;

    debouncedBusEmit('suggests ajax request', { str });
  });
};

export default initEvents;

import bus from '../../init/bus';

const initEvents: (self: HTMLElement) => void = (self) => {
  document.addEventListener('scroll', (event) => {
    const windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;

    if (windowRelativeBottom < document.documentElement.clientHeight + 100) {
      // console.log('blob');
      bus.emit('scroll to bottom', undefined);
    }
  });
};

export default initEvents;

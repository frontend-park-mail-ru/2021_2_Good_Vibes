import init from './init/script';

(function () {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', { scope: '/' })

      // .catch(() => navigator.serviceWorker.register('sw.js', { scope: '../' }))

      .catch((err) => {
        console.error(err);
      });
  }
}());

init();

// import eventBus from './scripts/eventBus.js';
// this.importScripts('foo.js')

// this.importScripts('./scripts/eventBus.js');

const CACHE_NAME = 'Ozon2.0 cache';

// const offlineFoo = () => {
//   // console.log('offline');
//   // console.log(window.blur());
//   // window.blur();

//   console.log(document.getElementsByClassName('main-container')[0]);

//   const temp = document.getElementsByClassName('main-container')[0];

//   temp.style.visibility = 'hidden';



// };

// const onlineFoo = () => {
//   // console.log('online');
//   // eventBus.emit('smth');
// };

this.addEventListener('install', (event) => {
  let cacheUrls = ['/'];

  event.waitUntil(
    fetch('./fileList')
      .then((response) => response.text())
      .then((text) => text.split('\n'))
      .then((split) => cacheUrls.concat(split))
      .then((split) => {
        cacheUrls = split.filter((url) => url !== './sw.js');
      })
      .then(() => console.log(cacheUrls))

      .then(() => caches.open(CACHE_NAME))
      .then((cache) => cache.addAll(cacheUrls))
      .then(() => console.log(cacheUrls))

      .catch((error) => console.error(error))
  );
});

this.addEventListener('fetch', (event) => {
  if (navigator.onLine === true) {
    // onlineFoo();
    return fetch(event.request);
  }

  // offlineFoo();
  event.respondWith(
    caches
      .match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request);
      })
      .catch((err) => {
        console.error('smth went wrong with caches.match: ', err);
        // alert('У Вас отсутствует интернет-соединение. Вы можете продолжать пользоваться кэшем сайта, однако запросы на наши сервера не будут отправлены');
        // caches.match('./images/cloth1.png');
      })
  );
});

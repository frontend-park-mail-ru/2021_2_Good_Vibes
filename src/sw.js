const CACHE_NAME = 'Ozon2.0 cache';

let cacheUrls = [
  '/',
  '/profile',
  '/signin',
  '/signup',
  '/homepage',
  '/product',
  '/cart',
  '/category',
  '/address',
  '/payment',
  '/confirmation',
  '/favorite',
  '/orders',
  '/reviews',
  '/new',
  '/brands',
  '/brand/product',
  '/brand',
];

this.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const response = await fetch('./fileList');
    const text = (await response.text()).split('\n');
    const split = cacheUrls.concat(text);
    cacheUrls = split.filter((url) => {
      if (url !== './_redirects'
        && url !== './fileList'
        && url !== './sw.js'
      ) {
        return url;
      }
      return undefined;
    });
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(cacheUrls);
  })());
});

this.addEventListener('fetch', (event) => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    if (navigator.onLine === true) {
      const response = await fetch(event.request);

      if (event.request.method !== 'POST') {
        cache.put(event.request, response.clone());
      }
      return response;
    }

    const r = await caches.match(event.request);
    if (r) return r;

    const response = await fetch(event.request);
    return response;
  })());
});

const CACHE = 'hiit-me-baby-v8-11';
const CORE = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './images/exercises/dead-bug-combo.webp',
  './images/exercises/bird-dog-combo.webp',
  './images/exercises/forearm-plank-leg-lift.webp',
  './images/exercises/side-plank-hip-dip.webp',
  './images/exercises/prone-w-reach.webp',
  './images/exercises/calf-raise-knee-drive.webp',
  './images/exercises/hip-hinge-knee-drive.webp',
  './images/exercises/push-up-shoulder-tap.webp',
  './images/exercises/walkout-plank.webp',
  './images/exercises/glute-bridge-leg-extension.webp',
  './images/exercises/bear-plank-shoulder-tap.webp',
  './images/exercises/plank-up-down.webp'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(CORE)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      const cache = await caches.open(CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (_) {
    return (await caches.match(request)) || (await caches.match('./index.html'));
  }
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  const destination = event.request.destination;
  const isCoreCode = destination === 'document' || destination === 'script' || destination === 'style'
    || url.pathname.endsWith('.webmanifest');

  if (isCoreCode) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE).then((cache) => cache.put(event.request, copy));
      return response;
    }))
  );
});

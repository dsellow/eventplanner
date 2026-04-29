/* ============================================================
   Event Command Center — Service Worker
   Handles offline caching using stale-while-revalidate strategy.
   Served as a real file at /sw.js for maximum browser compatibility.
============================================================ */

const CACHE = 'ecc-v4';

// Resources to cache on install (the bare minimum)
const APP_SHELL = [
  '/',
  '/index.html'
];

// External resources we want available offline
const EXTERNAL_CACHE = [
  'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap'
];


/* ── INSTALL ──
   Cache the app shell. Do not fail install if a resource times out. */
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then(cache => {
      return Promise.allSettled(
        APP_SHELL.map(url =>
          fetch(url, { cache: 'no-cache' })
            .then(res => {
              if (res && res.ok) return cache.put(url, res);
            })
            .catch(() => {})
        )
      );
    })
  );
});


/* ── ACTIVATE ──
   Remove old caches, take control of all open pages. */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});


/* ── FETCH ──
   Cache-first for same-origin (instant load, offline-safe).
   Network-first with cache fallback for external resources. */
self.addEventListener('fetch', event => {
  const req = event.request;

  // Only handle GET requests
  if (req.method !== 'GET') return;

  // Skip browser extensions and chrome:// URLs
  if (!req.url.startsWith('http')) return;

  const url = new URL(req.url);

  // ── Same-origin: cache-first / stale-while-revalidate ──
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.open(CACHE).then(cache =>
        cache.match(req).then(cached => {
          // Background revalidation
          const networkPromise = fetch(req)
            .then(res => {
              if (res && res.status === 200) {
                cache.put(req, res.clone());
              }
              return res;
            })
            .catch(() => cached); // offline: return cached if we have it

          // Return cached immediately if available, else wait for network
          return cached || networkPromise;
        })
      )
    );
    return;
  }

  // ── External resources: network-first, fall back to cache ──
  event.respondWith(
    fetch(req)
      .then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(cache => cache.put(req, clone));
        }
        return res;
      })
      .catch(() => caches.match(req))
  );
});


/* ── MESSAGE HANDLING ──
   Allows the page to trigger immediate SW updates */
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

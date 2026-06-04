/* ============================================================
   The Planner Workspace — Service Worker
   Handles offline caching using stale-while-revalidate strategy.
   Serves branded offline.html when a page is requested offline
   and hasn't been cached yet.
============================================================ */

const CACHE       = 'ecc-v4';
const OFFLINE_URL = '/offline.html';

// Resources to cache on install
const APP_SHELL = [
  '/',
  '/index.html',
  '/app',
  '/app.html',
  '/offline.html',
];


/* ── INSTALL ──
   Cache the app shell including offline fallback page. */
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
   Remove old caches and take control immediately. */
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
   Strategy:
   - Same-origin navigation requests: cache-first, branded offline fallback
   - Same-origin assets: stale-while-revalidate
   - External resources: network-first with cache fallback */
self.addEventListener('fetch', event => {
  const req = event.request;

  // Only handle GET requests
  if (req.method !== 'GET') return;

  // Skip non-http requests (browser extensions, etc.)
  if (!req.url.startsWith('http')) return;

  const url = new URL(req.url);

  // ── Same-origin requests ──
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.open(CACHE).then(cache =>
        cache.match(req).then(cached => {

          // Background revalidation — update cache silently when online
          const networkPromise = fetch(req)
            .then(res => {
              if (res && res.status === 200) {
                cache.put(req, res.clone());
              }
              return res;
            })
            .catch(async () => {
              // Offline and no cache hit — serve branded offline page
              // only for navigation requests (full page loads), not assets
              if (req.mode === 'navigate') {
                const offlinePage = await caches.match(OFFLINE_URL);
                if (offlinePage) return offlinePage;
              }
              // For non-navigation requests, return cached or nothing
              return cached || new Response('', { status: 503 });
            });

          // Serve cached version immediately if available
          return cached || networkPromise;
        })
      )
    );
    return;
  }

  // ── External resources (fonts, etc.) ──
  // Network-first, fall back to cache
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
   Allows the page to trigger immediate SW updates. */
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

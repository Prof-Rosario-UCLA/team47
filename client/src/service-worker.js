const VERSION = 'v1';
const STATIC_CACHE = `static-${VERSION}`;
const RUNTIME_CACHE = `runtime-${VERSION}`;

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys
                .filter(k => ![STATIC_CACHE, RUNTIME_CACHE].includes(k))
                .map(k => caches.delete(k))))
    );
    self.clients.claim();        // start controlling existing tabs
});

/* small helper used in fetch */
async function staleWhileRevalidate (request, cacheName) {
    const cache   = await caches.open(cacheName);
    const cached  = await cache.match(request);

    const network = fetch(request)
        .then(resp => {
            if (resp && resp.status === 200) cache.put(request, resp.clone());
            return resp;
        })
        .catch(() => cached);       // fall back to cache on network error

    return cached || network;       // return cached first if it existed
}

/* ---------- FETCH ---------- */
self.addEventListener('fetch', event => {
    const { request } = event;
    if (request.method !== 'GET') return;

    const url = new URL(request.url);

    /*  API – network-first, fall back to cache so data is fresh   */
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE));
        return;
    }

    /*  Other static files – cache-first, then network            */
    event.respondWith(
        caches.match(request).then(
            cached => cached || fetch(request).then(resp => {
                if (resp && resp.status === 200) {
                    caches.open(RUNTIME_CACHE).then(c => c.put(request, resp.clone()));
                }
                return resp;
            })
        )
    );
});

const RUNTIME_CACHE = 'runtime-cache-1';

async function fetchAndCache(request, cacheName) {
    const response = await fetch(request);

    if (response && response.ok) {
        const cache = await caches.open(cacheName);
        cache.put(request, response.clone());
    }

    return response;
}

self.addEventListener('install', event => {
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(k => !k.startsWith('runtime-cache'))
                    .map(k => caches.delete(k))
            )
        )
    );

    self.clients.claim();
});

self.addEventListener('fetch', event => {
    const { request } = event;
    if (request.method !== 'GET') return;
  
    const url = new URL(request.url);
  
    if (url.pathname.startsWith('/api/')) { // API: Network-first then fallback to cache
        event.respondWith((async () => {
            const cache = await caches.open(RUNTIME_CACHE);
            const cached = await cache.match(request);

            if (cached) {
                event.waitUntil(fetchAndCache(request, RUNTIME_CACHE));
                return cached;
            }

            return await fetchAndCache(request, RUNTIME_CACHE);
        })());

        return;
    }
  
    event.respondWith((async () => { // Static files: Cache-first
        const cached = await caches.match(request);
        if (cached) return cached;
        return await fetchAndCache(request, RUNTIME_CACHE);
    })());
});
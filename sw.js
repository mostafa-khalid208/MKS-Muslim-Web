/**
 * MKS Muslim - Service Worker
 * Enables PWA features and offline caching
 * Strategy:
 *   - HTML, JS, CSS → Network First (always get latest updates)
 *   - Images, Audio  → Cache First  (rarely change, safe to cache)
 *   - External APIs  → Network First with cache fallback
 */

const CACHE_NAME = 'mks-muslim-v2.1.0';

// Only cache heavy static assets (images/audio) with Cache-First
const CACHE_FIRST_PATTERNS = [
    /\.(png|jpg|jpeg|gif|svg|ico|webp)$/i,
    /\.(mp3|wav|ogg|aac)$/i,
    /fonts\.googleapis\.com/,
    /fonts\.gstatic\.com/,
    /cdnjs\.cloudflare\.com/
];

// External APIs - Network First with cache fallback (no-store for fresh data)
const EXTERNAL_API_PATTERNS = [
    /api\.aladhan\.com/,
    /api\.alquran\.cloud/,
    /api\.hadith\.gading\.dev/,
    /api3\.islamhouse\.com/
];

// Install event - cache only heavy static assets
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Install complete');
                return Promise.resolve();
            })
            .catch((error) => {
                console.error('Service Worker: Install failed', error);
            })
    );
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => name !== CACHE_NAME)
                        .map((name) => {
                            console.log('Service Worker: Deleting old cache', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => {
                console.log('Service Worker: Activate complete');
                return self.clients.claim();
            })
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = request.url;

    // Skip non-GET requests
    if (request.method !== 'GET') return;

    // External APIs → Network First with cache fallback
    if (EXTERNAL_API_PATTERNS.some(p => p.test(url))) {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    if (response.ok) {
                        const clone = response.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
                    }
                    return response;
                })
                .catch(() => caches.match(request))
        );
        return;
    }

    // Images & Audio → Cache First (safe to cache, rarely change)
    if (CACHE_FIRST_PATTERNS.some(p => p.test(url))) {
        event.respondWith(
            caches.match(request).then((cached) => {
                if (cached) return cached;
                return fetch(request).then((response) => {
                    if (response.ok) {
                        const clone = response.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
                    }
                    return response;
                }).catch(() => new Response('', { status: 503 }));
            })
        );
        return;
    }

    // HTML, JS, CSS, and everything else → Network First
    // Always try network first to get latest updates
    event.respondWith(
        fetch(request)
            .then((response) => {
                if (response.ok) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
                }
                return response;
            })
            .catch(() => {
                // Network failed → serve from cache as offline fallback
                return caches.match(request).then((cached) => {
                    if (cached) return cached;
                    // Last resort: return index.html for navigation requests
                    if (request.mode === 'navigate') {
                        return caches.match('/index.html');
                    }
                    return new Response('Offline', { status: 503 });
                });
            })
    );
});

// Background sync for prayer times
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-prayer-times') {
        event.waitUntil(syncPrayerTimes());
    }
});

async function syncPrayerTimes() {
    try {
        const clients = await self.clients.matchAll();
        clients.forEach((client) => {
            client.postMessage({ type: 'SYNC_PRAYER_TIMES' });
        });
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}

// Periodic background sync (if supported)
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'update-prayer-times') {
        event.waitUntil(syncPrayerTimes());
    }
});

// Push notifications
self.addEventListener('push', (event) => {
    if (!event.data) return;
    const data = event.data.json();
    const options = {
        body: data.body || 'إشعار جديد',
        icon: '/assets/images/My Logo Palestine.png',
        badge: '/assets/images/My Logo Palestine.png',
        vibrate: [200, 100, 200],
        tag: data.tag || 'notification',
        requireInteraction: data.requireInteraction || false,
        data: data.data || {}
    };
    event.waitUntil(
        self.registration.showNotification(data.title || 'MKS Muslim', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        self.clients.matchAll({ type: 'window' })
            .then((clientList) => {
                for (const client of clientList) {
                    if ('focus' in client) return client.focus();
                }
                if (self.clients.openWindow) return self.clients.openWindow('/');
            })
    );
});

/**
 * MKS Muslim - Service Worker
 * Enables PWA features and offline caching
 */

const CACHE_NAME = 'mks-muslim-v1.1.1';

const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/quran.html',
    '/tasbih.html',
    '/hadith.html',
    '/qibla.html',
    '/settings.html',
    '/about.html',
    '/css/style.css',
    '/js/app.js',
    '/js/api.js',
    '/js/localization.js',
    '/js/storage.js',
    '/js/notifications.js',
    '/assets/images/My Logo Palestine.png',
    '/assets/audio/audio_merger_الاذن_مع_الدعاء.mp3'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('Service Worker: Install complete');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('Service Worker: Install failed', error);
            })
    );
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

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip API requests - always fetch from network
    if (request.url.includes('api.aladhan.com') || 
        request.url.includes('api.alquran.cloud')) {
        event.respondWith(
            fetch(request)
                .catch(() => {
                    // Return cached API response if available
                    return caches.match(request);
                })
        );
        return;
    }
    
    // For other requests, try cache first, then network
    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    // Return cached response and update cache in background
                    event.waitUntil(
                        fetch(request)
                            .then((networkResponse) => {
                                if (networkResponse.ok) {
                                    caches.open(CACHE_NAME)
                                        .then((cache) => {
                                            cache.put(request, networkResponse);
                                        });
                                }
                            })
                            .catch(() => {
                                // Ignore network errors for background updates
                            })
                    );
                    return cachedResponse;
                }
                
                // Not in cache, fetch from network
                return fetch(request)
                    .then((networkResponse) => {
                        // Cache successful responses
                        if (networkResponse.ok) {
                            const responseClone = networkResponse.clone();
                            caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(request, responseClone);
                                });
                        }
                        return networkResponse;
                    })
                    .catch(() => {
                        // Return offline page for navigation requests
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
            client.postMessage({
                type: 'SYNC_PRAYER_TIMES'
            });
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

// Push notifications (if needed in future)
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
                // Focus existing window if available
                for (const client of clientList) {
                    if ('focus' in client) {
                        return client.focus();
                    }
                }
                // Open new window
                if (self.clients.openWindow) {
                    return self.clients.openWindow('/');
                }
            })
    );
});

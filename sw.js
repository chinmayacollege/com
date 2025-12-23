const CACHE_NAME = 'chinmaya-college-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/about.html',
    '/departments.html',
    '/admissions.html',
    '/contact.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    '/images/chinmaya-pu-college-logo.jpg',
    'https://fonts.googleapis.com/css2?family=Product+Sans:wght@400;500;700&family=Roboto:wght@400;500;700&display=swap'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

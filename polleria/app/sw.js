const CACHE_NAME = 'polleria-rey-v1';
const ASSETS = [
  '/polleriaREY/',
  '/polleriaREY/index.html',
  '/polleriaREY/manifest.json',
  '/polleriaREY/icono-192.png',
  '/polleriaREY/icono-512.png'
];

// Instalar el Service Worker y almacenar en caché los archivos básicos
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS).catch(err => console.log("Error de caché inicial:", err));
    })
  );
});

// Activar el Service Worker
self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

// Responder peticiones de la red o del caché
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});
// Este bloque es vital para habilitar la instalación en Android
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});

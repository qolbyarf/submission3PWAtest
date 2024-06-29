import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

// Precaching semua asset yang didefinisikan dalam __WB_MANIFEST
precacheAndRoute(self.__WB_MANIFEST);

// Definisi cache name tetap
const RESTO_API_CACHE_NAME = 'resto-api-cache';
const IMAGE_CACHE_NAME = 'image-cache';

// Register route untuk API dan gambar
registerRoute(
  ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev'),
  new StaleWhileRevalidate({
    cacheName: RESTO_API_CACHE_NAME,
  }),
);

registerRoute(
  ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/images/medium/'),
  new StaleWhileRevalidate({
    cacheName: IMAGE_CACHE_NAME,
  }),
);

// Event listener untuk install service worker
// self.addEventListener('install', (event) => {
//   console.log('Service Worker: Installed');
//   self.skipWaiting();
// });

// Event listener untuk push notification
self.addEventListener('push', (event) => {
  console.log('Service Worker: Pushed');

  const notificationData = {
    title: 'Push Notification',
    options: {
      body: 'This is a push notification',
      icon: '/favicon.png',
      image: '/icon-512x512/icon-512x512.jpg',
    },
  };

  const showNotification = self.registration.showNotification(
    notificationData.title,
    notificationData.options,
  );

  event.waitUntil(showNotification);
});

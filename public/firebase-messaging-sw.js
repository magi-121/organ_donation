importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker
firebase.initializeApp({
  apiKey: "AIzaSyDbDTzxgSJocrS1qx9A2Xe-GqPFmV4T3LQ",
  authDomain: "organdonation121.firebaseapp.com",
  projectId: "organdonation121",
  storageBucket: "organdonation121.firebasestorage.app",
  messagingSenderId: "122567062734",
  appId: "1:122567062734:web:6f8e5ff4691698da278c9f",
});

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification.title || 'New Notification';
  const notificationOptions = {
    body: payload.notification.body || '',
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png',
    data: payload.data || {},
    actions: [
      {
        action: 'view',
        title: 'View'
      }
    ]
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', function(event) {
  console.log('[firebase-messaging-sw.js] Notification click received.');
  
  event.notification.close();
  
  // Handle action clicks
  if (event.action === 'view' && event.notification.data.url) {
    event.waitUntil(clients.openWindow(event.notification.data.url));
  } else {
    event.waitUntil(clients.openWindow('/'));
  }
});

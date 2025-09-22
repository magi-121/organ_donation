import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { doc, updateDoc, arrayUnion, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

// Your Firebase Cloud Messaging VAPID key
const VAPID_KEY = 'your-vapid-key-from-firebase-console';

export const notificationService = {
  messaging: null,
  
  // Initialize messaging
  async init() {
    try {
      this.messaging = getMessaging();
      return { success: true };
    } catch (error) {
      console.error('Error initializing messaging:', error);
      return { success: false, error: error.message };
    }
  },

  // Request notification permission and get token
  async requestPermission(userId) {
    try {
      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        const token = await getToken(this.messaging, { vapidKey: VAPID_KEY });
        
        // Save token to Firestore
        await this.saveTokenToFirestore(userId, token);
        
        return { success: true, token };
      } else {
        return { success: false, error: 'Permission denied' };
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
      return { success: false, error: error.message };
    }
  },

  // Save FCM token to Firestore
  async saveTokenToFirestore(userId, token) {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        await updateDoc(userRef, {
          fcmTokens: arrayUnion(token),
          lastTokenUpdate: new Date()
        });
      } else {
        await setDoc(userRef, {
          fcmTokens: [token],
          lastTokenUpdate: new Date()
        }, { merge: true });
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error saving token:', error);
      return { success: false, error: error.message };
    }
  },

  // Listen to foreground messages
  onMessage(callback) {
    if (!this.messaging) {
      console.error('Messaging not initialized');
      return () => {};
    }

    return onMessage(this.messaging, (payload) => {
      console.log('Message received:', payload);
      
      // Create notification data
      const notificationData = {
        title: payload.notification?.title || 'New Notification',
        body: payload.notification?.body || '',
        image: payload.notification?.image || null,
        data: payload.data || {},
        timestamp: new Date()
      };
      
      // Show browser notification if permission granted
      if (Notification.permission === 'granted') {
        this.showNotification(notificationData);
      }
      
      // Call callback
      callback(notificationData);
    });
  },

  // Show browser notification
  showNotification(data) {
    const options = {
      body: data.body,
      icon: '/icon-192x192.png',
      badge: '/icon-72x72.png',
      image: data.image,
      vibrate: [200, 100, 200],
      data: data.data,
      actions: [
        {
          action: 'view',
          title: 'View'
        },
        {
          action: 'close',
          title: 'Close'
        }
      ]
    };

    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(data.title, options);
      
      notification.onclick = (event) => {
        event.preventDefault();
        window.focus();
        if (data.data.url) {
          window.location.href = data.data.url;
        }
        notification.close();
      };
    }
  },

  // Save notification to user's history
  async saveNotificationToHistory(userId, notification) {
    try {
      const notificationRef = doc(collection(db, 'users', userId, 'notifications'));
      await setDoc(notificationRef, {
        ...notification,
        read: false,
        createdAt: new Date()
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get user notifications
  async getUserNotifications(userId) {
    try {
      const q = query(
        collection(db, 'users', userId, 'notifications'),
        orderBy('createdAt', 'desc')
      );
      
      const snapshot = await getDocs(q);
      const notifications = [];
      
      snapshot.forEach((doc) => {
        notifications.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return { success: true, data: notifications };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Mark notification as read
  async markAsRead(userId, notificationId) {
    try {
      const notificationRef = doc(db, 'users', userId, 'notifications', notificationId);
      await updateDoc(notificationRef, {
        read: true,
        readAt: new Date()
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

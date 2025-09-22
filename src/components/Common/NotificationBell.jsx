import React, { useState, useEffect } from 'react';
import { Bell, BellOff } from 'lucide-react';
import { notificationService } from '../../services/notificationService';
import { useAuth } from '../../contexts/AuthContext';

const NotificationBell = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Initialize notifications
      initializeNotifications();
      
      // Listen to incoming messages
      const unsubscribe = notificationService.onMessage((notification) => {
        setNotifications(prev => [notification, ...prev]);
        setUnreadCount(prev => prev + 1);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const initializeNotifications = async () => {
    // Check permission status
    if ('Notification' in window) {
      setHasPermission(Notification.permission === 'granted');
      
      // Initialize notification service
      await notificationService.init();
      
      // Get user's notification history
      const result = await notificationService.getUserNotifications(user.uid);
      if (result.success) {
        setNotifications(result.data);
        setUnreadCount(result.data.filter(n => !n.read).length);
      }
    }
  };

  const enableNotifications = async () => {
    const result = await notificationService.requestPermission(user.uid);
    if (result.success) {
      setHasPermission(true);
    }
  };

  const markAsRead = async (notificationId) => {
    await notificationService.markAsRead(user.uid, notificationId);
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        {hasPermission ? (
          <Bell className="h-6 w-6 text-gray-600 dark:text-gray-400" />
        ) : (
          <BellOff className="h-6 w-6 text-gray-400" />
        )}
        
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 animate-slide-down">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
          </div>
          
          {!hasPermission ? (
            <div className="p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Enable notifications to stay updated
              </p>
              <button
                onClick={enableNotifications}
                className="w-full btn-primary py-2 text-sm"
              >
                Enable Notifications
              </button>
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No notifications yet
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              {notifications.slice(0, 10).map(notification => (
                <div
                  key={notification.id}
                  onClick={() => !notification.read && markAsRead(notification.id)}
                  className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer ${
                    !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                >
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {notification.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {notification.body}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(notification.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;

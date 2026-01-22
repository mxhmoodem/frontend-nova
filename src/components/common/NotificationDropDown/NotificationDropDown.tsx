import './NotificationDropDown.css';
import { FC } from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface NotificationDropDownProps {
  onClose: () => void;
}

const NotificationDropDown: FC<NotificationDropDownProps> = ({ onClose }) => {
  // Sample notifications - replace with real data from API/context
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'Market Alert',
      message: 'AAPL stock price increased by 5%',
      timestamp: '2 minutes ago',
      read: false,
    },
    {
      id: '2',
      title: 'Portfolio Update',
      message: 'Your portfolio performance improved',
      timestamp: '1 hour ago',
      read: false,
    },
    {
      id: '3',
      title: 'System Update',
      message: 'Platform maintenance completed',
      timestamp: '1 day ago',
      read: true,
    },
  ];

  const handleNotificationClick = (id: string) => {
    // Handle notification click - mark as read, navigate, etc.
    console.log('Notification clicked:', id);
  };

  const handleClearAll = () => {
    // Clear all notifications
    console.log('Clear all notifications');
  };

  return (
    <div className="notification-dropdown">
      <div className="notification-dropdown__header">
        <h3>Notifications</h3>
        <button
          className="notification-dropdown__close"
          onClick={onClose}
          aria-label="Close notifications"
        >
          ✕
        </button>
      </div>

      <div className="notification-dropdown__list">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${
                !notification.read ? 'notification-item--unread' : ''
              }`}
              onClick={() => handleNotificationClick(notification.id)}
            >
              <div className="notification-item__content">
                <h4 className="notification-item__title">
                  {notification.title}
                </h4>
                <p className="notification-item__message">
                  {notification.message}
                </p>
              </div>
              <span className="notification-item__timestamp">
                {notification.timestamp}
              </span>
            </div>
          ))
        ) : (
          <div className="notification-dropdown__empty">
            <p>No notifications yet</p>
          </div>
        )}
      </div>

      {notifications.length > 0 && (
        <div className="notification-dropdown__footer">
          <button
            className="notification-dropdown__clear-btn"
            onClick={handleClearAll}
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationDropDown;

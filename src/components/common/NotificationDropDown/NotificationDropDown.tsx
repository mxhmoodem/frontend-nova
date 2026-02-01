import './NotificationDropDown.css';
import { NotificationDropDownProps } from 'NotificationDropDown.model.ts';

function NotificationDropDown({
  onClose,
  notifications = [],
}: NotificationDropDownProps) {
  const handleNotificationClick = (id: string) => {
    console.log('Notification clicked:', id);
  };

  const handleClearAll = () => {
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
              {!notification.read && (
                <span className="notification-item__unread-indicator" />
              )}

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
}

export default NotificationDropDown;

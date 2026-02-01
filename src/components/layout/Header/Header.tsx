import './Header.css';
import { IoMdNotifications } from 'react-icons/io';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import { useState } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { Avatar, Button } from '../../../components/common';
import { useAuth } from '../../../hooks/useAuth';
import NotificationDropDown from '../../common/NotificationDropDown/NotificationDropDown';
<<<<<<< Updated upstream
=======
import { hasUnreadNotifications, Notification } from '../../common/NotificationDropDown/NotificationDropDown.model';
>>>>>>> Stashed changes

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Sample notifications - replace with real data from API/context
<<<<<<< Updated upstream
  const notifications = [
=======
  const notifications: Notification[] = [
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream

  // Check if there are any unread notifications
  const hasUnreadNotifications = notifications.some((n) => !n.read);
=======
>>>>>>> Stashed changes

  const userName = user?.name || 'Jane Smith';
  const hasUnread = hasUnreadNotifications(notifications);

  return (
    <header className="header">
      <div className="header__left">
        <div className="search-bar">{/* Future: Implement search bar */}</div>
      </div>

      <div className="header__right">
        {/* Notifications */}
        <div className="header__notification-wrapper">
<<<<<<< Updated upstream
          <Button
            variant="ghost"
            className="header__action"
            aria-label="Notifications"
            tooltip="Notifications"
            tooltipPosition="bottom"
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          >
            <IoMdNotifications size={24} />
            {hasUnreadNotifications && (
              <span className="header__notification-badge"></span>
            )}
          </Button>
          {isNotificationOpen && (
            <NotificationDropDown
              onClose={() => setIsNotificationOpen(false)}
=======
          <button
            className="header__action"
            aria-label="Notifications"
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            title="Notifications"
          >
            <IoMdNotifications size={24} />
            {hasUnread && <span className="header__notification-badge"></span>}
          </button>
          {isNotificationOpen && (
            <NotificationDropDown 
              onClose={() => setIsNotificationOpen(false)} 
              notifications={notifications}
>>>>>>> Stashed changes
            />
          )}
        </div>

        {/* Theme toggle */}
        <Button
          variant="ghost"
          className="header__action"
          onClick={toggleTheme}
          aria-label={
            theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
          }
          tooltip={
            theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
          }
          tooltipPosition="bottom"
        >
          {theme === 'dark' ? <IoMdSunny size={24} /> : <IoMdMoon size={24} />}
        </Button>

        {/* User menu */}
        <Avatar
          name={userName}
          role="Engineer"
          onclick={() => {
            // Implement in future
          }}
        />
      </div>
    </header>
  );
}

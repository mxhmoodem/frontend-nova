import './Header.css';
import { IoMdNotifications } from 'react-icons/io';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import { useState } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { Avatar, Button } from '../../../components/common';
import { useAuth } from '../../../hooks/useAuth';
import NotificationDropDown from '../../common/Notifications/Notifications';
import { notificationsConfig } from '../../common/Notifications/Notifications.config';
import { hasUnreadNotifications } from '../../common/Notifications/Notifications.utils';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const hasUnread = hasUnreadNotifications(notificationsConfig);
  const userName = user?.name || 'Jane Smith';

  return (
    <header className="header">
      <div className="header__left">
        <div className="search-bar">
          {/* TODO: Implement search bar or other feature */}
        </div>
      </div>

      <div className="header__right">
        {/* Notifications */}
        <div className="header__notification-wrapper">
          <Button
            variant="ghost"
            className="header__action"
            aria-label="Notifications"
            tooltip="Notifications"
            tooltipPosition="bottom"
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          >
            <IoMdNotifications size={24} />
            {hasUnread && <span className="header__notification-badge"></span>}
          </Button>
          {isNotificationOpen && (
            <NotificationDropDown
              onClose={() => setIsNotificationOpen(false)}
              notifications={notificationsConfig}
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

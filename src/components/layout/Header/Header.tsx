import './Header.css';
import { IoMdNotifications } from 'react-icons/io';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import { useTheme } from '../../../hooks/useTheme';
import { Avatar, Button } from '../../../components/common';
import { useAuth } from '../../../hooks/useAuth';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  const userName = user?.name || 'Jane Smith';

  return (
    <header className="header">
      <div className="header__left">
        <div className="search-bar">{/* Future: Implement search bar */}</div>
      </div>

      <div className="header__right">
        {/* Notifications */}
        <Button
          variant="ghost"
          className="header__action"
          icon={<IoMdNotifications size={24} />}
          aria-label="Notifications"
        />

        {/* Theme toggle */}
        <Button
          variant="ghost"
          className="header__action"
          onClick={toggleTheme}
          icon={
            theme === 'dark' ? <IoMdSunny size={24} /> : <IoMdMoon size={24} />
          }
          aria-label="Toggle theme"
        />

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

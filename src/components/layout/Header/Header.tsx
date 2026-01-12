import './Header.css';
import { IoMdNotifications } from 'react-icons/io';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import { useTheme } from '../../../hooks/useTheme';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header__left">
        <div className="search-bar">{/* Future: Implement search bar */}</div>
      </div>

      <div className="header__right">
        {/* Notifications */}
        <button className="header__action" aria-label="Notifications">
          <IoMdNotifications size={24} />
        </button>

        {/* Theme toggle */}
        <button
          className="header__action"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <IoMdSunny size={24} /> : <IoMdMoon size={24} />}
        </button>

        {/* User menu */}
        <div className="header__user">
          <button className="header__user-button" aria-label="User menu">
            <span className="header__user-avatar">U</span>
            <span className="header__user-name">User</span>
          </button>
        </div>
      </div>
    </header>
  );
}

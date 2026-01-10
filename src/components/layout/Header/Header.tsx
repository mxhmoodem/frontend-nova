import { useState } from 'react';
import './Header.css';
import { IoMdNotifications } from 'react-icons/io';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';

export default function Header() {
  const [isDark, setIsDark] = useState(false);

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
          onClick={() => setIsDark(!isDark)}
          aria-label="Toggle theme"
        >
          {isDark ? <IoMdSunny size={24} /> : <IoMdMoon size={24} />}
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

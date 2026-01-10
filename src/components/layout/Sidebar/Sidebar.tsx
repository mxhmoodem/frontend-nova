import { NavLink } from 'react-router-dom';
import { ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';
import { navigationItems } from '../../../constants/navigation';
import hsbcLogo from '../../../assets/icons/hsbc-logo.png';
import './Sidebar.css';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  return (
    <aside className={`sidebar ${isCollapsed ? 'sidebar--collapsed' : ''}`}>
      {/* Sidebar Header */}
      <div
        className={`sidebar__header${isCollapsed ? ' sidebar__header--collapsed' : ''}`}
      >
        <div className="sidebar__brand-group">
          {!isCollapsed && (
            <div className="sidebar__logo-container">
              <img src={hsbcLogo} alt="HSBC Logo" className="sidebar__logo" />
            </div>
          )}
          <h1 className="sidebar__title">{isCollapsed ? '' : 'Noval IQ'}</h1>
        </div>
        <button
          className="sidebar__toggle"
          onClick={onToggle}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar__nav">
        <ul className="sidebar__nav-list">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id} className="sidebar__nav-item">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `sidebar__nav-link ${isActive ? 'sidebar__nav-link--active' : ''}`
                  }
                >
                  {Icon && (
                    <span className="sidebar__nav-icon">
                      <Icon size={20} />
                    </span>
                  )}
                  {!isCollapsed && (
                    <span className="sidebar__nav-label">{item.label}</span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Help Button */}
      <button className="sidebar__help-button" aria-label="Help">
        <span className="sidebar__nav-icon">
          <HelpCircle size={20} />
        </span>
        {!isCollapsed && <span className="sidebar__nav-label">Help</span>}
      </button>
    </aside>
  );
}

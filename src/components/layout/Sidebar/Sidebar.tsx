import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { ROUTES } from '../../../constants/routes';
import { navigationItems } from '../../../constants/navigation';
import { SidebarProps } from './Sidebar.types';
import hsbcLogo from '../../../assets/icons/hsbc-logo.png';
import './Sidebar.css';
import Tooltip from '../../common/Tooltip/Tooltip';

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };
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
          aria-label={
            isCollapsed
              ? t('common.expandSidebar')
              : t('common.collapseSidebar')
          }
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar__nav">
        <ul className="sidebar__nav-list">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const navLink = (
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
                  <span className="sidebar__nav-label">
                    {t(`navigation.${item.id}`)}
                  </span>
                )}
              </NavLink>
            );

            return (
              <li key={item.id} className="sidebar__nav-item">
                {isCollapsed ? (
                  <Tooltip
                    content={t(`navigation.${item.id}`)}
                    position="right"
                  >
                    {navLink}
                  </Tooltip>
                ) : (
                  navLink
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Actions */}
      <div className="sidebar__bottom-actions">
        {isCollapsed ? (
          <Tooltip content={t('common.logout')} position="right">
            <button
              className="sidebar__logout-button"
              onClick={handleLogout}
              aria-label={t('common.logout')}
            >
              <span className="sidebar__nav-icon">
                <LogOut size={20} />
              </span>
            </button>
          </Tooltip>
        ) : (
          <button
            className="sidebar__logout-button"
            onClick={handleLogout}
            aria-label={t('common.logout')}
          >
            <span className="sidebar__nav-icon">
              <LogOut size={20} />
            </span>
            {!isCollapsed && (
              <span className="sidebar__nav-label">{t('common.logout')}</span>
            )}
          </button>
        )}
      </div>
    </aside>
  );
}

import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import './DashboardLayout.css';

export default function DashboardLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { pathname } = useLocation();

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  const isAIConsole = pathname.includes('ai-console');

  return (
    <div
      className={`dashboard-layout${
        isAIConsole ? ' dashboard-layout--no-bg' : ''
      }`}
    >
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />

      <div className="dashboard-layout__main">
        <Header />
        <main className="dashboard-layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

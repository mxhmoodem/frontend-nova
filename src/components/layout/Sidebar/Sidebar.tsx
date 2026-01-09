import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  Shield,
  Database,
  Sparkles,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '../../../utils/cn';
import type { SidebarProps, NavItem } from './Sidebar.types';

const navItems: NavItem[] = [
  { path: '/app/overview', icon: LayoutDashboard, label: 'Overview' },
  { path: '/app/market-pulse', icon: TrendingUp, label: 'Market Pulse' },
  { path: '/app/regulatory-radar', icon: Shield, label: 'Regulatory Radar' },
  { path: '/app/content-hub', icon: Database, label: 'Content Hub' },
  { path: '/app/ai-console', icon: Sparkles, label: 'AI Console' },
  { path: '/app/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  return (
    <aside
      className={cn(
        'h-screen bg-card border-r border-border flex flex-col transition-all duration-300 ease-in-out shrink-0',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="h-24 flex items-center px-6 border-b border-border">
        <div className="flex items-center gap-4 overflow-hidden">
          <div className="flex-shrink-0 w-14 h-14 bg-white rounded-xl flex items-center justify-center border border-border shadow-sm">
            <span className="text-2xl font-bold text-primary">N</span>
          </div>
          {!isCollapsed && (
            <span className="font-bold text-xl tracking-tight whitespace-nowrap text-foreground">
              Noval IQ
            </span>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                isCollapsed && 'justify-center'
              )
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && (
              <span className="text-sm font-medium">{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border space-y-2">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-2 rounded-md text-muted-foreground hover:bg-secondary transition-colors"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>

        <NavLink
          to="/app/help"
          className={cn(
            'flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md transition-colors',
            isCollapsed && 'justify-center'
          )}
        >
          <HelpCircle className="w-5 h-5" />
          {!isCollapsed && <span>Help</span>}
        </NavLink>
      </div>
    </aside>
  );
}

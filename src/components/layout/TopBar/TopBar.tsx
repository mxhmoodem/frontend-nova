import { useState, useEffect } from 'react';
import { Search, Bell, Moon, Sun, Sparkles } from 'lucide-react';
import type { TopBarProps } from './TopBar.types';

export default function TopBar({ onAIClick }: TopBarProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-30 px-6 flex items-center justify-between">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search dashboards, reports, and data..."
            className="w-full h-10 pl-10 pr-4 rounded-lg bg-secondary/50 border border-transparent focus:bg-background focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all outline-none"
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        {/* Primary Action */}
        <button
          onClick={onAIClick}
          className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity shadow-sm"
        >
          <Sparkles className="w-4 h-4" />
          <span>Ask AI</span>
        </button>

        <div className="h-6 w-px bg-border" />

        {/* Icons */}
        <div className="flex items-center gap-2">
          <button
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors relative"
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-background" />
          </button>

          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {/* User Profile */}
          <button className="ml-2 flex items-center gap-2 p-1 pr-3 rounded-lg hover:bg-secondary transition-colors border border-transparent hover:border-border">
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-foreground font-semibold border border-border">
              JS
            </div>
            <div className="hidden md:block text-left">
              <div className="text-xs font-semibold">Jane Smith</div>
              <div className="text-[10px] text-muted-foreground">Admin</div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

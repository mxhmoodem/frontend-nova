import {
  LayoutDashboard,
  TrendingUp,
  Shield,
  Database,
  Sparkles,
  Settings as SettingsIcon,
} from 'lucide-react';
import type { NavigationItem } from './navigation.types';

export const navigationItems: NavigationItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    path: '/app/overview',
    icon: LayoutDashboard,
  },
  {
    id: 'market-pulse',
    label: 'Market Pulse',
    path: '/app/market-pulse',
    icon: TrendingUp,
  },
  {
    id: 'regulatory-radar',
    label: 'Regulatory Radar',
    path: '/app/regulatory-radar',
    icon: Shield,
  },
  {
    id: 'content-hub',
    label: 'Content Hub',
    path: '/app/content-hub',
    icon: Database,
  },
  {
    id: 'ai-console',
    label: 'AI Console',
    path: '/app/ai-console',
    icon: Sparkles,
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/app/settings',
    icon: SettingsIcon,
  },
];

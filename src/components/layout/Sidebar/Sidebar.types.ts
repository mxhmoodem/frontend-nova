export interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export interface NavItem {
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

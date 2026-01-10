export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  children?: NavigationItem[];
}

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  children?: RouteConfig[];
}

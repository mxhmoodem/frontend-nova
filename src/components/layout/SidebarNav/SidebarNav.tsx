import { NavLink } from 'react-router-dom';

interface NavItem {
  path: string;
  label: string;
}

interface SidebarNavProps {
  items: NavItem[];
}

export default function SidebarNav({ items }: SidebarNavProps) {
  return (
    <nav className="space-y-1">
      {items.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `block px-3 py-2 rounded-md text-sm font-medium ${
              isActive
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

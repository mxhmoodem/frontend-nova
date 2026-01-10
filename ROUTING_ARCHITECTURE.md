# Frontend Nova - Routing Architecture Guide

### Navigation Flow

```
User clicks "Market Pulse" in Sidebar
    ↓
React Router navigates to /app/market-pulse
    ↓
DashboardLayout stays rendered (persistent)
    ↓
<Outlet /> updates to render <MarketPulse />
    ↓
Page content changes, layout stays the same
```

### Flow Diagram

```
Example: User clicks "Market Pulse" in sidebar
┌─────────────────────────────────────────────────────┐
│                    Browser URL                      │
│              /app/market-pulse                      │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│              React Router                           │
│  • Matches /app → DashboardLayout                   │
│  • Matches /market-pulse → MarketPulse              │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│           DashboardLayout                           │
│  ┌──────────────┐  ┌──────────────────────────┐     │
│  │   Sidebar    │  │      Header              │     │
│  │              │  ├──────────────────────────┤     │
│  │ • Overview   │  │                          │     │
│  │ • AI Console │  │  <Outlet />              │     │
│  │ • Market ✓   │  │    ↓                     │     │
│  │ • Regulatory │  │  <MarketPulse />         │     │
│  │ • Content    │  │                          │     │
│  │ • Settings   │  │                          │     │
│  └──────────────┘  └──────────────────────────┘     │
│                                                     │
│  State: { isSidebarCollapsed: false }               │
└─────────────────────────────────────────────────────┘
```

1. **User clicks NavLink** in Sidebar component
2. **React Router** intercepts the navigation
3. **Route matches** `/app/market-pulse`
4. **DashboardLayout** remains rendered (persistent layout)
5. **Outlet** updates to render `<MarketPulse />` component
6. **NavLink** automatically updates active state
7. **Result**: Page content changes while layout stays the same

### Routes Configured

| Route                   | Component         |
| ----------------------- | ----------------- |
| `/`                     | → `/app/overview` |
| `/app`                  | DashboardLayout   |
| `/app/overview`         | Overview          |
| `/app/ai-console`       | AIConsole         |
| `/app/market-pulse`     | MarketPulse       |
| `/app/regulatory-radar` | RegulatoryRadar   |
| `/app/content-hub`      | ContentHub        |
| `/app/settings`         | Settings          |

## Architecture Pattern

### Component Structure

```
App.tsx (Router)
└── DashboardLayout (Persistent Shell)
    ├── Sidebar (Navigation with NavLink)
    ├── Header (Top Bar)
    └── <Outlet /> (Dynamic Page Content)
        ├── Overview
        ├── AI Console
        ├── Market Pulse
        ├── Regulatory Radar
        ├── Content Hub
        └── Settings
```

### High-Level Flow

```
main.tsx
  └─> App.tsx (Router configuration)
       └─> App Routes (/app/*)
            └─> DashboardLayout (Persistent layout)
                 ├─> Sidebar (Navigation)
                 ├─> Header (Top bar)
                 └─> <Outlet /> (Page content)
                      ├─> Overview
                      ├─> AI Console
                      ├─> Market Pulse
                      ├─> Regulatory Radar
                      ├─> Content Hub
                      └─> Settings
```

### Key Files Created

#### Routing Core

- ✅ `src/constants/routes.ts` - Centralized route constants
- ✅ `src/types/routing.types.ts` - Route type definitions
- ✅ `src/App.tsx` - Router configuration with nested routes

#### Layout Components

- ✅ `src/components/layout/DashboardLayout/DashboardLayout.tsx` - Shell with `<Outlet />`
- ✅ `src/components/layout/Sidebar/Sidebar.tsx` - Navigation with `<NavLink />`
- ✅ `src/components/layout/Header/Header.tsx` - Top navigation bar

---

## Component Responsibilities

#### 1. **App.tsx** - Root Router Configuration

- **Purpose**: Defines all application routes and routing hierarchy
- **Responsibilities**:
  - Configures React Router with BrowserRouter
  - Defines route structure
  - Sets up nested routes with DashboardLayout as parent
  - Handles redirects and fallback routes
- **Key Pattern**: Uses nested routes where DashboardLayout is the parent element for all `/app/*` routes

```typescript
<Route path={ROUTES.APP_ROOT} element={<DashboardLayout />}>
  <Route path="overview" element={<Overview />} />
  <Route path="ai-console" element={<AIConsole />} />
  // ... more routes
</Route>
```

#### 2. **DashboardLayout.tsx** - Persistent Layout Shell

- **Purpose**: Provides the persistent layout structure for all authenticated pages
- **Responsibilities**:
  - Renders Sidebar and Header components
  - Manages layout-level state (sidebar collapse, etc.)
  - Renders child routes via `<Outlet />`
  - Maintains consistent layout across route changes
- **Key Pattern**: Uses React Router's `<Outlet />` component to render child routes
- **State Management**: Owns layout state that should persist across navigation

```typescript
<div className="dashboard-layout">
  <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
  <div className="dashboard-layout__main">
    <Header onMenuClick={toggleSidebar} isSidebarCollapsed={isSidebarCollapsed} />
    <main className="dashboard-layout__content">
      <Outlet /> {/* Child routes render here */}
    </main>
  </div>
</div>
```

#### 3. **Sidebar.tsx** - Navigation Component

- **Purpose**: Displays navigation links and handles route switching
- **Responsibilities**:
  - Renders navigation menu items
  - Uses `NavLink` for automatic active state management
  - Supports collapsed/expanded states
  - Highlights the current route
- **Key Pattern**: Uses `NavLink` component which automatically adds active class

```typescript
<NavLink
  to={item.path}
  className={({ isActive }) =>
    `sidebar__nav-link ${isActive ? 'sidebar__nav-link--active' : ''}`
  }
>
  {/* Link content */}
</NavLink>
```

#### 4. **Header.tsx** - Top Navigation Bar

- **Purpose**: Displays top-level navigation and user actions
- **Responsibilities**:
  - Shows breadcrumbs (future)
  - Provides quick actions (search, notifications)
  - Displays user menu
  - Shows menu toggle on mobile
- **State**: Receives props from DashboardLayout for coordinated behavior

#### 5. **Page Components** (Overview, AIConsole, etc.)

- **Purpose**: Individual page content
- **Responsibilities**:
  - Render page-specific content
  - Manage page-level state
  - Fetch and display data
- **Key Pattern**: These components render inside DashboardLayout's `<Outlet />`

## Route Configuration

### Routes Structure

```typescript
// Application routes
/ → Redirects to /app/overview
/app → Redirects to /app/overview
/app/overview → Overview dashboard
/app/ai-console → AI Console
/app/market-pulse → Market Pulse
/app/regulatory-radar → Regulatory Radar
/app/content-hub → Content Hub
/app/settings → Settings

// Fallback
* → Redirects to /app/overview
```

### Route Constants

All routes are defined in `src/constants/routes.ts` for type safety and centralized management:

```typescript
export const ROUTES = {
  ROOT: '/',
  APP_ROOT: '/app',
  OVERVIEW: '/app/overview',
  AI_CONSOLE: '/app/ai-console',
  MARKET_PULSE: '/app/market-pulse',
  REGULATORY_RADAR: '/app/regulatory-radar',
  CONTENT_HUB: '/app/content-hub',
  SETTINGS: '/app/settings',
} as const;
```

## Adding a New Page

To add a new page (e.g., "Analytics"):

1. **Create the page component**:

   ```typescript
   // src/pages/Analytics/Analytics.tsx
   export default function Analytics() {
     return <div><h1>Analytics</h1></div>;
   }
   ```

2. **Add route constant**:

   ```typescript
   // src/constants/routes.ts
   export const ROUTES = {
     // ... existing routes
     ANALYTICS: '/app/analytics',
   };
   ```

3. **Add route to App.tsx**:

   ```typescript
   // src/App.tsx
   <Route path={ROUTES.APP_ROOT} element={<DashboardLayout />}>
     {/* ... existing routes */}
     <Route path="analytics" element={<Analytics />} />
   </Route>
   ```

4. **Add navigation item to Sidebar**:
   ```typescript
   // src/components/layout/Sidebar/Sidebar.tsx
   const navigationItems: NavItem[] = [
     // ... existing items
     {
       id: 'analytics',
       label: 'Analytics',
       path: ROUTES.ANALYTICS,
       icon: '📊',
     },
   ];
   ```

## Architecture Comparison

| Aspect           | global-payments-main | frontend-nova            |
| ---------------- | -------------------- | ------------------------ |
| Language         | JavaScript           | TypeScript               |
| Router           | React Router v6      | React Router v6          |
| Layout Pattern   | AppShell + Outlet    | DashboardLayout + Outlet |
| Navigation       | Sidebar + NavLink    | Sidebar + NavLink        |
| Top Bar          | TopBar               | Header                   |
| State Management | Local in AppShell    | Local in DashboardLayout |
| Route Constants  | None                 | Centralized              |
| Type Safety      | None                 | Full TypeScript          |
| Data Access      | Global Payments API  | Decoupled (flexible)     |

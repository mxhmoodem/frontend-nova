# Migration Documentation: Global Payments Content Hub → Frontend Nova

## Overview

This document describes the migration of design and components from `global-payments-content-hub` into the `frontend-nova` codebase. The migration was completed following the established blueprint structure of `frontend-nova` while incorporating the design patterns and UI elements from the content hub.

## Migration Summary

- **Source Project**: `global-payments-content-hub`
- **Target Project**: `frontend-nova`
- **Migration Date**: January 2026
- **Migration Approach**: Minimal, component-based migration with full test coverage

---

## What Was Migrated

### 1. Layout Components

| Component | Path | Description |
|-----------|------|-------------|
| `AppShell` | `src/components/layout/AppShell/` | Main application wrapper with sidebar and topbar integration |
| `Sidebar` | `src/components/layout/Sidebar/` | Collapsible navigation sidebar with icons and routes |
| `TopBar` | `src/components/layout/TopBar/` | Header with search, AI button, notifications, theme toggle, and user profile |
| `CornerPattern` | `src/components/layout/CornerPattern/` | Decorative SVG patterns for visual depth |

### 2. Common Components

| Component | Path | Description |
|-----------|------|-------------|
| `Button` | `src/components/common/Button/` | Configurable button with variants (primary, secondary, ghost, destructive, outline) |
| `Card` | `src/components/common/Card/` | Card container with header, content, and footer sub-components |
| `Input` | `src/components/common/Input/` | Input field with label, error states, and icon support |
| `Badge` | `src/components/common/Badge/` | Status badges with multiple variants (success, warning, danger, etc.) |
| `Avatar` | `src/components/common/Avatar/` | User avatar with image or fallback initials |

### 3. Feature Components

| Component | Path | Description |
|-----------|------|-------------|
| `AIAssistant` | `src/components/features/ai/AIAssistant/` | Sliding AI chat panel with message history |
| `StatCard` | `src/components/features/analytics/StatCard/` | KPI display card with trend indicators |
| `InfoModal` | `src/components/features/common/InfoModal/` | Educational modal explaining page functionality |

### 4. Pages

| Page | Path | Description |
|------|------|-------------|
| `Overview` | `src/pages/Overview/` | Main dashboard with KPIs, regulatory radar, and market pulse |
| `MarketPulse` | `src/pages/MarketPulse/` | UK payment trends and market analysis |
| `RegulatoryRadar` | `src/pages/RegulatoryRadar/` | Compliance tracking and regulatory timeline |
| `ContentHub` | `src/pages/ContentHub/` | Document management and content library |
| `AIConsole` | `src/pages/AIConsole/` | Full AI assistant interface |
| `Settings` | `src/pages/Settings/` | Application settings and preferences |
| `Help` | `src/pages/Help/` | Help and documentation |
| `Profile` | `src/pages/Profile/` | User profile management |

### 5. Auth Pages

| Page | Path | Description |
|------|------|-------------|
| `LandingPage` | `src/pages/auth/LandingPage/` | Public landing page |
| `Login` | `src/pages/auth/Login/` | User authentication |
| `Register` | `src/pages/auth/Register/` | New user registration |
| `ForgotPassword` | `src/pages/auth/ForgotPassword/` | Password recovery |

---

## File Structure

Each component follows a consistent structure:

```
ComponentName/
├── ComponentName.tsx       # Main component implementation
├── ComponentName.test.tsx  # Unit tests (Vitest + React Testing Library)
├── ComponentName.types.ts  # TypeScript type definitions
└── ComponentName.module.css # Optional CSS modules (if needed)
```

---

## Technical Implementation

### Styling Approach

1. **Tailwind CSS**: Primary styling solution with custom configuration
2. **CSS Variables**: Theme-aware colors using HSL custom properties
3. **Class Utility**: `cn()` function combining `clsx` and `tailwind-merge` for conditional classes

### Theme System

The application supports light and dark themes via CSS custom properties:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 354 100% 43%; /* #DB0011 - HSBC Red */
  /* ... additional variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark mode overrides */
}
```

### Routing

Routes are defined in `src/App.tsx` using React Router v6:

- **Public routes**: `/`, `/login`, `/register`, `/forgot-password`
- **Protected routes**: All routes under `/app/*` wrapped in `AppShell`

### Dependencies Added

```json
{
  "clsx": "^2.x",
  "tailwind-merge": "^2.x",
  "lucide-react": "^0.x",
  "@tailwindcss/postcss": "^4.x",
  "tailwindcss-animate": "^1.x"
}
```

---

## Post-Migration Modifications

After the initial migration, the following changes were made:

### 1. Hidden Features

The following navigation items were removed from the sidebar:
- Scenarios (`/app/insights/scenarios`)
- Reports (`/app/insights/reports`)
- Alerts (`/app/alerts`)
- Workspaces (`/app/workspaces`)
- Reports Library (`/app/reports`)

**Note**: The page components and routes still exist but are not accessible through navigation.

### 2. Dashboard AI Section

The AI search bar on the Overview dashboard was replaced with a simple button that directs users to the AI Console page at `/app/ai-console`. This provides a cleaner dashboard experience while still offering easy access to AI features.

---

## Testing

All components include unit tests using:
- **Vitest**: Test runner
- **React Testing Library**: Component testing
- **@testing-library/jest-dom**: DOM matchers

Run tests with:
```bash
npm run test        # Watch mode
npm run test:run    # Single run
```

---

## How the Migration Was Done

### Phase 1: Infrastructure Setup
1. Configured Tailwind CSS with PostCSS
2. Set up CSS custom properties for theming
3. Created utility function `cn()` for class merging
4. Updated `index.html` with Inter font

### Phase 2: Layout Components
1. Created `Sidebar` with navigation items and collapse functionality
2. Created `TopBar` with search, AI button, and user controls
3. Created `AppShell` to combine sidebar, topbar, and content area
4. Created `CornerPattern` for decorative backgrounds

### Phase 3: Common Components
1. Built reusable `Button`, `Card`, `Input`, `Badge`, `Avatar` components
2. Each component includes TypeScript types and unit tests
3. Components follow consistent API patterns

### Phase 4: Feature Components
1. Created `AIAssistant` as a sliding chat panel
2. Created `StatCard` for KPI display
3. Created `InfoModal` for page explanations

### Phase 5: Pages
1. Migrated and adapted page designs from content hub
2. Each page includes info modal with educational content
3. Pages use consistent layout patterns

### Phase 6: Testing & Cleanup
1. Added comprehensive unit tests for all components
2. Fixed linting issues
3. Removed hidden features from navigation
4. Simplified AI section on dashboard

---

## Files Modified/Created

### Configuration Files
- `postcss.config.mjs` - Tailwind CSS configuration
- `index.html` - Added Inter font
- `src/index.css` - CSS variables and base styles

### Utility Files
- `src/utils/cn.ts` - Class name utility

### Component Files
- All files in `src/components/layout/`
- All files in `src/components/common/`
- All files in `src/components/features/`

### Page Files
- All files in `src/pages/`

### Export Files
- `src/components/layout/index.ts`
- `src/components/common/index.ts`
- `src/components/features/ai/index.ts`
- `src/components/features/common/index.ts`
- `src/components/features/analytics/index.ts`

---

## Notes

1. **Minimal Changes**: The migration was designed to be as minimal as possible while maintaining full functionality
2. **Reusability**: All components are designed to be reusable across the application
3. **Type Safety**: Full TypeScript support with dedicated type files
4. **Test Coverage**: All components have corresponding test files
5. **Hidden Pages**: Scenarios, Reports, Alerts, Workspaces, and Reports Library pages exist in the codebase but are not accessible via navigation

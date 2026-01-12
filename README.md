[![CI/CD Pipeline](https://github.com/mxhmoodem/frontend-nova/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/mxhmoodem/frontend-nova/actions/workflows/ci.yml)

# MarketTrends Dashboard - Project Structure

## Overview

This document explains the file structure and organization for the MarketTrends dashboard SBA (Single Board Application) built with React, TypeScript, and SWC.

## Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   ├── Button.types.ts
│   │   │   └── Button.css
│   │   ├── Card/
│   │   │   ├── Card.tsx
│   │   │   ├── Card.test.tsx
│   │   │   ├── Card.types.ts
│   │   │   └── Card.css
│   │   ├── Input/
│   │   │   ├── Input.tsx
│   │   │   ├── Input.test.tsx
│   │   │   ├── Input.types.ts
│   │   │   └── Input.css
│   │   ├── LoadingSpinner/
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── LoadingSpinner.test.tsx
│   │   │   └── LoadingSpinner.css
│   │   └── index.ts (barrel exports)
│   │
│   ├── layout/
│   │   ├── DashboardLayout/
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── DashboardLayout.test.tsx
│   │   │   ├── DashboardLayout.types.ts
│   │   │   ├── DashboardLayout.css
│   │   │   └── index.ts
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   ├── Header.test.tsx
│   │   │   ├── Header.types.ts
│   │   │   ├── Header.css
│   │   │   └── index.ts
│   │   └── Sidebar/
│   │       ├── Sidebar.tsx
│   │       ├── Sidebar.test.tsx
│   │       ├── Sidebar.types.ts
│   │       ├── Sidebar.css
│   │       └── index.ts
│   │
│   └── features/
│       ├── analytics/
│       │   ├── AnalyticsCard/
│       │   │   ├── AnalyticsCard.tsx
│       │   │   ├── AnalyticsCard.test.tsx
│       │   │   ├── AnalyticsCard.types.ts
│       │   │   └── AnalyticsCard.css
│       │   ├── AnalyticsChart/
│       │   │   ├── AnalyticsChart.tsx
│       │   │   ├── AnalyticsChart.test.tsx
│       │   │   ├── AnalyticsChart.types.ts
│       │   │   └── AnalyticsChart.css
│       │   └── index.ts
│       ├── reports/
│       │   ├── ReportTable/
│       │   │   ├── ReportTable.tsx
│       │   │   ├── ReportTable.test.tsx
│       │   │   ├── ReportTable.types.ts
│       │   │   └── ReportTable.css
│       │   └── index.ts
│       ├── settings/
│       │   ├── SettingsForm/
│       │   │   ├── SettingsForm.tsx
│       │   │   ├── SettingsForm.test.tsx
│       │   │   ├── SettingsForm.types.ts
│       │   │   └── SettingsForm.css
│       │   └── index.ts
│       └── trends/
│           ├── TrendsFilter/
│           │   ├── TrendsFilter.tsx
│           │   ├── TrendsFilter.test.tsx
│           │   ├── TrendsFilter.types.ts
│           │   └── TrendsFilter.css
│           ├── TrendsList/
│           │   ├── TrendsList.tsx
│           │   ├── TrendsList.test.tsx
│           │   ├── TrendsList.types.ts
│           │   └── TrendsList.css
│           └── index.ts
│
├── pages/
│   ├── AIConsole/
│   │   ├── AIConsole.tsx
│   │   ├── AIConsole.test.tsx
│   │   └── AIConsole.css
│   ├── ContentHub/
│   │   ├── ContentHub.tsx
│   │   ├── ContentHub.test.tsx
│   │   └── ContentHub.css
│   ├── MarketPulse/
│   │   ├── MarketPulse.tsx
│   │   ├── MarketPulse.test.tsx
│   │   └── MarketPulse.css
│   ├── Overview/
│   │   ├── Overview.tsx
│   │   ├── Overview.test.tsx
│   │   └── Overview.css
│   ├── RegulatoryRadar/
│   │   ├── RegulatoryRadar.tsx
│   │   ├── RegulatoryRadar.test.tsx
│   │   └── RegulatoryRadar.css
│   └── Settings/
│       ├── Settings.tsx
│       ├── Settings.test.tsx
│       └── Settings.css
│
├── hooks/
│   ├── useMarketData/
│   │   ├── useMarketData.ts
│   │   ├── useMarketData.test.ts
│   │   └── useMarketData.types.ts
│   └── useSidebar/
│       ├── useSidebar.ts
│       ├── useSidebar.test.ts
│       └── useSidebar.types.ts
│
├── context/
│   ├── AuthContext/
│   │   ├── AuthContext.tsx
│   │   ├── AuthContext.test.tsx
│   │   └── AuthContext.types.ts
│   └── ThemeContext/
│       ├── ThemeContext.tsx
│       ├── ThemeContext.test.tsx
│       └── ThemeContext.types.ts
│
├── services/
│   ├── api/
│   │   ├── api.ts
│   │   ├── api.test.ts
│   │   └── api.types.ts
│   └── marketTrendsApi/
│       ├── marketTrendsApi.ts
│       ├── marketTrendsApi.test.ts
│       └── marketTrendsApi.types.ts
│
├── types/
│   ├── dashboard.types.ts
│   ├── market.types.ts
│   └── routing.types.ts
│
├── utils/
│   ├── formatters.ts
│   ├── formatters.test.ts
│   └── formatters.types.ts
│
├── constants/
│   ├── navigation.ts
│   ├── navigation.types.ts
│   └── routes.ts
│
├── styles/
│   ├── globals.css
│   ├── theme.css
│   ├── utilities.css
│   └── variables.css
│
├── assets/
│   ├── icons/
│   └── images/
│
├── test/
│   └── setup.ts
│
├── App.tsx
├── App.test.tsx
├── App.css
├── main.tsx
├── index.css
└── vite-env.d.ts
```

## Folder Descriptions

### **hooks/** - Custom React Hooks

Reusable logic that uses React hooks (useState, useEffect, etc.)

**useMarketData.ts** - Fetches and manages market data state

```typescript
export const useMarketData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch market data
  }, []);

  return { data, loading };
};

// Usage in components:
const { data, loading } = useMarketData();
```

**useSidebar.ts** - Manages sidebar open/close state

```typescript
export const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  return { isOpen, toggle };
};
```

---

### **context/** - React Context (Global State)

Shares state across the entire app without prop drilling

**ThemeContext.tsx** - Dark/light mode throughout app

```typescript
const ThemeContext = createContext();

// Provider wraps your app
<ThemeProvider>
  <App />
</ThemeProvider>

// Any component can access theme
const { theme, toggleTheme } = useContext(ThemeContext);
```

**AuthContext.tsx** - User authentication state (logged in/out, user info)

---

### **services/** - API Communication

All external API calls live here

**api.ts** - Base API configuration (axios instance, headers)

```typescript
export const api = axios.create({
  baseURL: 'https://api.markettrends.com',
  headers: { 'Content-Type': 'application/json' },
});
```

**marketTrendsApi.ts** - Specific API endpoints

```typescript
export const getTrends = async () => {
  const response = await api.get('/trends');
  return response.data;
};

export const getAnalytics = async (id: string) => {
  return api.get(`/analytics/${id}`);
};
```

---

### **types/** - TypeScript Definitions

Shared types/interfaces used across the app

**market.types.ts**

```typescript
export interface MarketTrend {
  id: string;
  name: string;
  value: number;
  change: number;
  timestamp: Date;
}

export type TrendPeriod = '24h' | '7d' | '30d' | '1y';
```

**dashboard.types.ts**

```typescript
export interface DashboardData {
  metrics: Metric[];
  charts: ChartData[];
}

export interface NavItem {
  path: string;
  label: string;
  icon: string;
}
```

---

### **utils/** - Helper Functions

Pure functions for data transformation, formatting, calculations

**formatters.ts**

```typescript
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export const formatPercentage = (value: number): string => {
  return `${(value * 100).toFixed(2)}%`;
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US');
};

// Usage:
const price = formatCurrency(1234.56); // "$1,234.56"
```

---

### **constants/** - Static Configuration

Values that never change at runtime

**navigation.ts**

```typescript
export const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: 'HomeIcon' },
  { path: '/analytics', label: 'Analytics', icon: 'ChartIcon' },
  { path: '/trends', label: 'Trends', icon: 'TrendingIcon' },
  { path: '/reports', label: 'Reports', icon: 'FileIcon' },
  { path: '/settings', label: 'Settings', icon: 'SettingsIcon' },
];

export const API_ENDPOINTS = {
  TRENDS: '/api/trends',
  ANALYTICS: '/api/analytics',
};

export const CHART_COLORS = ['#3b82f6', '#ef4444', '#10b981'];
```

---

## Components Structure

### **components/common/** - Reusable UI Components

- Button/
- Card/
- Input/
- LoadingSpinner/

### **components/layout/** - Layout Components

- **DashboardLayout/** - Wraps all dashboard pages, includes sidebar
- **Sidebar/** - Navigation sidebar component
- **SidebarNav/** - Navigation items within sidebar
- **Header/** - Top header bar

Use barrel exports (index.ts) for cleaner imports:

```typescript
// components/layout/index.ts
export { DashboardLayout } from './DashboardLayout/DashboardLayout';
export { Sidebar } from './Sidebar/Sidebar';
export { Header } from './Header/Header';
```

### **components/features/** - Feature-Specific Components

- analytics/
- trends/
- reports/
- settings/

---

## Pages Structure

Route-level components that compose feature components:

- Dashboard.tsx
- Analytics.tsx
- Trends.tsx
- Reports.tsx
- Settings.tsx

Pages are thin and primarily compose feature components together.

---

## Example: How They Work Together

```typescript
// In your Analytics component:
import { useMarketData } from '../hooks/useMarketData';
import { formatCurrency } from '../utils/formatters';
import { MarketTrend } from '../types/market.types';

const Analytics = () => {
  const { data, loading } = useMarketData(); // Hook

  return (
    <div>
      {data?.map((trend: MarketTrend) => ( // Type
        <p>{formatCurrency(trend.value)}</p> // Util
      ))}
    </div>
  );
};
```

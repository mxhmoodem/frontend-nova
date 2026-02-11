# API Integration Guide

> Complete guide for integrating the frontend with the backend API.

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Quick Start](#quick-start)
4. [Setup Instructions](#setup-instructions)
5. [Folder Structure](#folder-structure)
6. [Using the API](#using-the-api)
7. [Page Integration Examples](#page-integration-examples)
8. [Error Handling](#error-handling)
9. [Testing](#testing)
10. [Best Practices](#best-practices)

---

## Overview

This document explains how to integrate the frontend Nova application with the backend API. The integration uses:

- **React Query (TanStack Query)** - For data fetching, caching, and state management
- **Custom API Client** - Type-safe fetch wrapper with error handling
- **Domain-specific Services** - Organized API calls by feature
- **Custom Hooks** - Easy-to-use React hooks for components

### Key Benefits
  
✅ **Type-safe** - Full TypeScript support  
✅ **Automatic caching** - React Query handles cache management  
✅ **Error handling** - Centralised error management  
✅ **Loading states** - Built-in loading/error states  

---

## Architecture

### Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                REACT COMPONENT                              │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │  const { data, isLoading, error } = usePaymentStats();              │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                      │                                      │
│                                      ▼                                      │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                         REACT QUERY HOOK                            │  │
│   │  usePaymentStats() → calls paymentApi.getStats()                    │  │
│   │  • Manages cache                                                     │  │
│   │  • Handles refetching                                                │  │
│   │  • Provides loading states                                           │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                      │                                      │
│                                      ▼                                      │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                         API SERVICE                                 │  │
│   │  paymentApi.getStats() → apiClient.get('/payment/stats')            │  │
│   │  • Endpoint specific logic                                           │  │
│   │  • Request transformation                                            │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                      │                                      │
│                                      ▼                                      │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                         API CLIENT                                  │  │
│   │  apiClient.get<PaymentStats>('/payment/stats')                      │  │
│   │  • HTTP request execution                                            │  │
│   │  • Error handling                                                    │  │
│   │  • Timeout management                                                │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                      │                                      │
└──────────────────────────────────────┼──────────────────────────────────────┘
                                       │
                                       ▼
                    ┌──────────────────────────────────────┐
                    │           BACKEND API                │
                    │   http://localhost:8000/api/v1       │
                    │                                      │
                    │   /payment/stats                     │
                    │   /payment/payment-methods           │
                    │   /agent                             │
                    │   /content                           │
                    │   /legislation                       │
                    │   /market                            │
                    │   /notification                      │
                    └──────────────────────────────────────┘
```

---

## Quick Start

### 1. Wrap App with QueryProvider

```tsx
// src/main.tsx
import { QueryProvider } from './services/api';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </React.StrictMode>
);
```

### 2. Use Hooks in Components

```tsx
// src/pages/MarketPulse/MarketPulse.tsx
import { usePaymentStats, usePaymentMethods, useTrendAlerts } from '../../services/api';
import { LoadingSpinner } from '../../components/common';

function MarketPulse() {
  const { data: stats, isLoading, error } = usePaymentStats();
  const { data: methods } = usePaymentMethods();
  const { data: alerts } = useTrendAlerts();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <div>
      <StatCards stats={stats} />
      <PaymentMethodBreakdown methods={methods} />
      <TrendAlerts alerts={alerts} />
    </div>
  );
}
```

---

## Setup Instructions

### Step 1: Install Dependencies

The dependencies are already in `package.json`:

```json
{
  "dependencies": {
    "@tanstack/react-query": "^5.90.19"
  }
}
```

Run `npm install` if not already done.

### Step 2: Configure API URL

Edit `src/services/api/shared/config.ts`:

```typescript
export const API_CONFIG = {
  development: {
    baseUrl: 'http://localhost:8000/api/v1',  // Your local backend
    timeout: 30000,
  },
  production: {
    baseUrl: 'https://your-domain.com/api/v1', // Production URL
    timeout: 30000,
  },
};
```

### Step 3: Set Up Query Provider

Update `src/main.tsx`:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryProvider } from './services/api';
import { AuthProvider } from './context/AuthContext/AuthContext';
import { ThemeProvider } from './context/ThemeContext/ThemeContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <AuthProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </AuthProvider>
      </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>
);
```

### Step 4: Start Using Hooks

Import hooks in your components and start fetching data!

---

## Folder Structure

The API module uses a **feature-based architecture** where each domain has its own self-contained module.

```
src/services/api/
├── index.ts              # Main export file - import everything from here
│
├── shared/               # Shared utilities used by all modules
│   ├── index.ts          # Re-exports all shared utilities
│   ├── client.ts         # Core HTTP client (fetch wrapper)
│   ├── config.ts         # API URLs, timeouts, and configuration
│   ├── types.ts          # Shared TypeScript types (ApiError, etc.)
│   ├── queryClient.ts    # React Query client instance
│   └── queryProvider.tsx # React Query provider component
│
├── payment/              # Payment statistics (Bank of England)
│   ├── index.ts          # Module re-exports
│   ├── payment.types.ts  # PaymentStats, PaymentMethod, TrendAlert
│   ├── payment.endpoints.ts  # API endpoint paths
│   ├── payment.keys.ts   # React Query cache keys
│   ├── payment.api.ts    # API service functions
│   └── payment.hooks.ts  # usePaymentStats, usePaymentMethods, etc.
│
├── agent/                # AI Console queries
│   ├── index.ts
│   ├── agent.types.ts    # AgentQueryRequest, AgentQueryResponse
│   ├── agent.endpoints.ts
│   ├── agent.keys.ts
│   ├── agent.api.ts      # agentApi.sendQuery
│   └── agent.hooks.ts    # useAgentQuery
│
├── content/              # Content Hub (upload/download)
│   ├── index.ts
│   ├── content.types.ts  # ContentDocument, ContentUploadRequest
│   ├── content.endpoints.ts
│   ├── content.keys.ts
│   ├── content.api.ts    # contentApi (CRUD + download/upload)
│   └── content.hooks.ts  # useContent, useUploadContent, etc.
│
├── legislation/          # Regulatory documents
│   ├── index.ts
│   ├── legislation.types.ts  # Legislation, LegislationList
│   ├── legislation.endpoints.ts
│   ├── legislation.keys.ts
│   ├── legislation.api.ts
│   └── legislation.hooks.ts  # useLegislation, useLegislationDetail
│
├── market/               # Market trends data
│   ├── index.ts
│   ├── market.types.ts   # MarketTrend, MarketTrendList
│   ├── market.endpoints.ts
│   ├── market.keys.ts
│   ├── market.api.ts
│   └── market.hooks.ts   # useMarketTrends, useMarketTrend
│
└── notifications/        # User notifications
    ├── index.ts
    ├── notifications.types.ts  # Notification, NotificationList
    ├── notifications.endpoints.ts
    ├── notifications.keys.ts
    ├── notifications.api.ts
    └── notifications.hooks.ts  # useNotifications, etc.
```

### Module Structure Pattern

Each feature module follows the same structure:

| File | Purpose |
|------|---------|
| `{module}.types.ts` | TypeScript interfaces and types |
| `{module}.endpoints.ts` | API endpoint path constants |
| `{module}.keys.ts` | React Query cache key factory |
| `{module}.api.ts` | API service functions |
| `{module}.hooks.ts` | React Query hooks |
| `index.ts` | Re-exports everything from the module |

---

## Using the API

### Method 1: Using Hooks (Recommended)

For React components, use the provided hooks:

```tsx
import { usePaymentStats } from '../../services/api';

function MyComponent() {
  const { data, isLoading, error, refetch } = usePaymentStats();
  
  // data: PaymentStats | undefined
  // isLoading: boolean
  // error: Error | null
  // refetch: () => void
}
```

### Method 2: Using API Services Directly

For non-React code or one-off requests:

```typescript
import { paymentApi } from '../../services/api';

async function fetchData() {
  const stats = await paymentApi.getStats();
  console.log(stats);
}
```

### Method 3: Using the Raw Client

For custom endpoints or special cases:

```typescript
import { apiClient } from '../../services/api';

const data = await apiClient.get<CustomType>('/custom/endpoint');
const result = await apiClient.post<ResponseType>('/custom/endpoint', { body: 'data' });
```

---

## Page Integration Examples

### MarketPulse Page

```tsx
// src/pages/MarketPulse/MarketPulse.tsx

import { 
  usePaymentStats, 
  usePaymentMethods, 
  useTrendAlerts 
} from '../../services/api';
import { 
  MarketStatCard, 
  PaymentMethodBreakdown, 
  TrendAlerts,
  LoadingSpinner 
} from '../../components/common';

export default function MarketPulse() {
  // Fetch all data in parallel (React Query handles this efficiently)
  const { data: stats, isLoading: statsLoading } = usePaymentStats();
  const { data: methods, isLoading: methodsLoading } = usePaymentMethods();
  const { data: alerts, isLoading: alertsLoading } = useTrendAlerts();

  // Combined loading state
  const isLoading = statsLoading || methodsLoading || alertsLoading;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="market-pulse-page">
      <header>
        <h2>Market Pulse</h2>
      </header>

      {/* Payment Statistics Cards */}
      <section className="market-stats">
        {stats && (
          <>
            <MarketStatCard
              label="Consumer Credit"
              value={`£${stats.consumerCredit.value}M`}
              change={stats.consumerCredit.change}
              trend={stats.consumerCredit.changeDirection}
            />
            <MarketStatCard
              label="Bank Rate"
              value={`${stats.bankRate.value}%`}
              change={stats.bankRate.change}
              trend={stats.bankRate.changeDirection}
            />
          </>
        )}
      </section>

      {/* Payment Methods Breakdown */}
      {methods && <PaymentMethodBreakdown methods={methods} />}

      {/* Trend Alerts */}
      {alerts && <TrendAlerts alerts={alerts} />}
    </div>
  );
}
```

### AI Console Page

```tsx
// src/pages/AIConsole/AIConsole.tsx

import { useState } from 'react';
import { useAgentQuery } from '../../services/api';
import { AIQuerySearch, ChatMessage, LoadingSpinner } from '../../components/common';

export default function AIConsole() {
  const [messages, setMessages] = useState<Message[]>([]);
  
  // Mutation hook for sending queries
  const { mutate: sendQuery, isPending } = useAgentQuery();

  const handleAsk = (query: string) => {
    if (!query.trim()) return;

    // Add user message immediately
    const userMessage = { role: 'user', content: query, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);

    // Send to API
    sendQuery(query, {
      onSuccess: (response) => {
        const aiMessage = { 
          role: 'ai', 
          content: response.response, 
          timestamp: new Date() 
        };
        setMessages(prev => [...prev, aiMessage]);
      },
      onError: (error) => {
        const errorMessage = { 
          role: 'ai', 
          content: `Sorry, something went wrong: ${error.message}`, 
          timestamp: new Date() 
        };
        setMessages(prev => [...prev, errorMessage]);
      },
    });
  };

  return (
    <div className="ai-console-page">
      <div className="messages-container">
        {messages.map((msg, i) => (
          <ChatMessage key={i} role={msg.role} content={msg.content} />
        ))}
        {isPending && <LoadingSpinner />}
      </div>
      
      <AIQuerySearch onAsk={handleAsk} disabled={isPending} />
    </div>
  );
}
```

### Content Hub Page

```tsx
// src/pages/ContentHub/ContentHub.tsx

import { 
  useContent, 
  useUploadContent, 
  useDeleteContent,
  useDownloadContent 
} from '../../services/api';
import { 
  DocumentGrid, 
  UploadDocumentModal, 
  LoadingSpinner 
} from '../../components/common';

export default function ContentHub() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  // Fetch documents
  const { data: documents, isLoading } = useContent();
  
  // Mutations
  const uploadMutation = useUploadContent();
  const deleteMutation = useDeleteContent();
  const downloadMutation = useDownloadContent();

  const handleUpload = (formData: ContentUploadRequest) => {
    uploadMutation.mutate(formData, {
      onSuccess: () => {
        setShowUploadModal(false);
        // List automatically refreshes via cache invalidation
      },
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleDownload = (id: string, filename: string) => {
    downloadMutation.mutate({ id, filename });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="content-hub-page">
      <header>
        <h2>Content Hub</h2>
        <button onClick={() => setShowUploadModal(true)}>
          Upload Document
        </button>
      </header>

      <DocumentGrid 
        documents={documents ?? []}
        onDelete={handleDelete}
        onDownload={handleDownload}
      />

      <UploadDocumentModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={handleUpload}
        isLoading={uploadMutation.isPending}
      />
    </div>
  );
}
```

### Regulatory Radar Page

```tsx
// src/pages/RegulatoryRadar/RegulatoryRadar.tsx

import { useLegislation } from '../../services/api';
import { ComplianceTimeline, StatCard, LoadingSpinner } from '../../components/common';

export default function RegulatoryRadar() {
  const { data: legislation, isLoading, error } = useLegislation();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} />;

  // Transform legislation to timeline events
  const timelineEvents = legislation?.map(item => ({
    id: item.id,
    title: item.title,
    description: item.description,
    date: new Date(item.created_at),
  }));

  return (
    <div className="regulatory-radar-page">
      <header>
        <h2>Regulatory Radar</h2>
      </header>

      <section className="stats">
        <StatCard title="Total Documents" value={legislation?.length ?? 0} />
      </section>

      <ComplianceTimeline events={timelineEvents ?? []} />
    </div>
  );
}
```

### Overview Dashboard

```tsx
// src/pages/Overview/Overview.tsx

import { 
  usePaymentStats, 
  useNotifications,
  useMarketTrends 
} from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

export default function Overview() {
  const { user } = useAuth();
  
  // Fetch summary data for dashboard
  const { data: paymentStats } = usePaymentStats();
  const { data: notifications } = useNotifications();
  const { data: marketTrends } = useMarketTrends();

  const unreadCount = notifications?.filter(n => !n.read).length ?? 0;

  return (
    <div className="overview-page">
      <h2>Welcome back, {user?.name}</h2>
      
      <section className="quick-stats">
        {paymentStats && (
          <QuickStatCard 
            title="Bank Rate" 
            value={`${paymentStats.bankRate.value}%`} 
          />
        )}
        
        <QuickStatCard 
          title="Unread Notifications" 
          value={unreadCount} 
        />
        
        <QuickStatCard 
          title="Market Trends" 
          value={marketTrends?.length ?? 0} 
        />
      </section>
    </div>
  );
}
```

---

## Error Handling

### In Components (Using Hooks)

```tsx
function MyComponent() {
  const { data, error, isLoading, isError } = usePaymentStats();

  if (isLoading) return <LoadingSpinner />;
  
  if (isError) {
    return (
      <ErrorMessage>
        {error instanceof ApiClientError
          ? `Error ${error.status}: ${error.message}`
          : 'Something went wrong'}
      </ErrorMessage>
    );
  }

  return <DataDisplay data={data} />;
}
```

### Global Error Handling

```tsx
// Create an error boundary component
import { useQueryClient } from '@tanstack/react-query';

function GlobalErrorHandler({ children }) {
  const queryClient = useQueryClient();

  // Set up global error handling
  queryClient.setDefaultOptions({
    queries: {
      onError: (error) => {
        console.error('Query error:', error);
        // Show toast notification, log to monitoring service, etc.
      },
    },
  });

  return children;
}
```

### Error Types

```typescript
import { ApiClientError } from '../../services/api';

try {
  const data = await paymentApi.getStats();
} catch (error) {
  if (error instanceof ApiClientError) {
    switch (error.status) {
      case 401:
        // Redirect to login
        break;
      case 404:
        // Show not found message
        break;
      case 500:
        // Show server error
        break;
      default:
        // Generic error
    }
  }
}
```

---

## Testing

### Testing Hooks

```tsx
// src/services/api/hooks/usePaymentQueries.test.ts

import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePaymentStats } from './usePaymentQueries';
import { paymentApi } from '../endpoints';

// Mock the API
vi.mock('../endpoints', () => ({
  paymentApi: {
    getStats: vi.fn(),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('usePaymentStats', () => {
  it('should fetch payment stats', async () => {
    const mockData = { bankRate: { value: 5.25, change: 0.25 } };
    vi.mocked(paymentApi.getStats).mockResolvedValue(mockData);

    const { result } = renderHook(() => usePaymentStats(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    
    expect(result.current.data).toEqual(mockData);
  });
});
```

### Testing Components with API

```tsx
// src/pages/MarketPulse/MarketPulse.test.tsx

import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MarketPulse from './MarketPulse';
import { paymentApi } from '../../services/api';

vi.mock('../../services/api', async () => {
  const actual = await vi.importActual('../../services/api');
  return {
    ...actual,
    paymentApi: {
      getStats: vi.fn(),
      getPaymentMethods: vi.fn(),
      getTrendAlerts: vi.fn(),
    },
  };
});

describe('MarketPulse', () => {
  it('should display payment stats', async () => {
    vi.mocked(paymentApi.getStats).mockResolvedValue({
      bankRate: { value: 5.25, change: 0.25, changeDirection: 'up' },
    });

    render(
      <QueryClientProvider client={new QueryClient()}>
        <MarketPulse />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('5.25%')).toBeInTheDocument();
    });
  });
});
```

---

## Best Practices

### 1. Always Use Hooks for Data Fetching

```tsx
// ✅ Good
const { data } = usePaymentStats();

// ❌ Bad - using useEffect for data fetching
useEffect(() => {
  paymentApi.getStats().then(setData);
}, []);
```

### 2. Handle Loading and Error States

```tsx
// ✅ Good
if (isLoading) return <Skeleton />;
if (error) return <ErrorMessage error={error} />;
return <DataDisplay data={data} />;

// ❌ Bad - ignoring loading/error states
return <DataDisplay data={data} />;
```

### 3. Use Query Keys Consistently

```tsx
// ✅ Good - using centralized query keys
queryKey: queryKeys.payment.stats()

// ❌ Bad - hardcoded strings
queryKey: ['payment', 'stats']
```

### 4. Invalidate Queries After Mutations

```tsx
// ✅ Good - invalidating after mutation
const uploadMutation = useUploadContent(); // Already handles invalidation

// Or manually:
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: queryKeys.content.lists() });
}
```

### 5. Use Optimistic Updates for Better UX

```tsx
// For delete operations
const deleteMutation = useMutation({
  mutationFn: contentApi.delete,
  onMutate: async (id) => {
    await queryClient.cancelQueries({ queryKey: queryKeys.content.lists() });
    
    const previous = queryClient.getQueryData(queryKeys.content.lists());
    
    queryClient.setQueryData(queryKeys.content.lists(), (old) =>
      old?.filter(item => item.id !== id)
    );
    
    return { previous };
  },
  onError: (err, id, context) => {
    queryClient.setQueryData(queryKeys.content.lists(), context?.previous);
  },
});
```

### 6. Co-locate Related Queries

```tsx
// ✅ Good - combining related data in one component
function MarketPulse() {
  const { data: stats } = usePaymentStats();
  const { data: methods } = usePaymentMethods();
  const { data: alerts } = useTrendAlerts();
  // ...
}
```

---

## API Reference Quick Links

| Endpoint | Hook | API Service |
|----------|------|-------------|
| `GET /payment/stats` | `usePaymentStats()` | `paymentApi.getStats()` |
| `GET /payment/payment-methods` | `usePaymentMethods()` | `paymentApi.getPaymentMethods()` |
| `GET /payment/trend-alerts` | `useTrendAlerts()` | `paymentApi.getTrendAlerts()` |
| `POST /agent` | `useAgentQuery()` | `agentApi.sendQuery()` |
| `GET /market` | `useMarketTrends()` | `marketApi.getAll()` |
| `GET /market/:id` | `useMarketTrend(id)` | `marketApi.getById(id)` |
| `GET /legislation` | `useLegislation()` | `legislationApi.getAll()` |
| `GET /legislation/:id` | `useLegislationDetail(id)` | `legislationApi.getById(id)` |
| `GET /content` | `useContent()` | `contentApi.getAll()` |
| `GET /content/:id` | `useContentDetail(id)` | `contentApi.getById(id)` |
| `POST /content` | `useUploadContent()` | `contentApi.upload()` |
| `DELETE /content/:id` | `useDeleteContent()` | `contentApi.delete()` |
| `GET /notification` | `useNotifications()` | `notificationsApi.getAll()` |

---

## Troubleshooting

### CORS Errors

Make sure the backend allows requests from `http://localhost:5173`. Check `main.py` on the backend:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Network Errors

1. Ensure the backend is running: `uvicorn main:app --reload --port 8000`
2. Check the API URL in `config.ts`
3. Check browser console for detailed error messages

### Stale Data

Force a refetch:
```tsx
const { refetch } = usePaymentStats();
refetch(); // Manually trigger refetch
```

Or invalidate the cache:
```tsx
const queryClient = useQueryClient();
queryClient.invalidateQueries({ queryKey: queryKeys.payment.all });
```

---

## Next Steps

1. ✅ Set up `QueryProvider` in `main.tsx`
2. ✅ Replace mock data with API hooks in each page
3. ✅ Add loading spinners and error states
4. ✅ Test the integration
5. ✅ Add authentication headers when auth is implemented

For questions or issues, refer to the [TanStack Query documentation](https://tanstack.com/query/latest).

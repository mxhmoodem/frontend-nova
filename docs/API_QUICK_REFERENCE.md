# API Integration Quick Reference

## File Structure

```
src/services/api/
├── index.ts              # Main exports (import everything from here)
│
├── shared/               # Shared utilities
│   ├── client.ts         # HTTP client (fetch wrapper)
│   ├── config.ts         # URLs, timeouts, configuration
│   ├── types.ts          # Shared TypeScript types
│   ├── queryClient.ts    # React Query client instance
│   └── queryProvider.tsx # Provider component
│
├── payment/              # Payment stats (MarketPulse)
│   ├── payment.types.ts  # Types
│   ├── payment.endpoints.ts
│   ├── payment.keys.ts
│   ├── payment.api.ts
│   └── payment.hooks.ts  # usePaymentStats, usePaymentMethods, etc.
│
├── agent/                # AI Console queries
│   └── agent.hooks.ts    # useAgentQuery
│
├── content/              # Content Hub
│   └── content.hooks.ts  # useContent, useUploadContent, etc.
│
├── legislation/          # Regulatory Radar
│   └── legislation.hooks.ts  # useLegislation, useLegislationDetail
│
├── market/               # Market trends
│   └── market.hooks.ts   # useMarketTrends, useMarketTrend
│
└── notifications/        # User notifications
    └── notifications.hooks.ts  # useNotifications, etc.
```

## Quick Setup

### 1. Add QueryProvider to main.tsx

```tsx
import { QueryProvider } from './services/api';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryProvider>
    <App />
  </QueryProvider>
);
```

### 2. Use Hooks in Components

```tsx
import { usePaymentStats, useContent, useAgentQuery } from '../../services/api';

function MyComponent() {
  const { data, isLoading, error } = usePaymentStats();
  // ...
}
```

## Available Hooks

| Hook | Description | Page |
|------|-------------|------|
| `usePaymentStats()` | Payment dashboard stats | MarketPulse |
| `usePaymentMethods()` | Payment method breakdown | MarketPulse |
| `useTrendAlerts()` | Significant change alerts | MarketPulse |
| `useAgentQuery()` | Send AI queries | AIConsole |
| `useMarketTrends()` | Market trend data | Overview |
| `useLegislation()` | Legislation documents | RegulatoryRadar |
| `useContent()` | Content hub documents | ContentHub |
| `useUploadContent()` | Upload documents | ContentHub |
| `useDeleteContent()` | Delete documents | ContentHub |
| `useDownloadContent()` | Download files | ContentHub |
| `useNotifications()` | All notifications | Header |

## Backend Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/payment/stats` | GET | Dashboard stats |
| `/payment/payment-methods` | GET | Method breakdown |
| `/payment/trend-alerts` | GET | Trend alerts |
| `/agent` | POST | AI query |
| `/market` | GET | Market trends |
| `/legislation` | GET | Legislation list |
| `/content` | GET/POST | Content CRUD |
| `/notification` | GET/PATCH/DELETE | Notifications |

## Common Patterns

### Loading State
```tsx
const { data, isLoading } = usePaymentStats();
if (isLoading) return <LoadingSpinner />;
```

### Error Handling
```tsx
const { error, isError } = usePaymentStats();
if (isError) return <ErrorMessage error={error} />;
```

### Mutation
```tsx
const mutation = useUploadContent();
mutation.mutate(data, { onSuccess: () => toast('Uploaded!') });
```

### Manual Refetch
```tsx
const { refetch } = usePaymentStats();
<button onClick={() => refetch()}>Refresh</button>
```

## Configuration

Edit `src/services/api/shared/config.ts`:
- `API_CONFIG.development.baseUrl` - Local backend URL
- `API_CONFIG.production.baseUrl` - Production URL
- `QUERY_CONFIG.staleTime` - Cache freshness duration

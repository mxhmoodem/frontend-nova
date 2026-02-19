/**
 * API Module
 * ==========
 * Central export point for all API modules.
 *
 * Architecture:
 * -------------
 * src/services/api/
 * ├── shared/          # Shared utilities (client, config, types)
 * ├── payment/         # Payment stats & methods
 * ├── agent/           # AI agent queries
 * ├── content/         # Document management
 * ├── legislation/     # Regulatory data
 * ├── market/          # Market trends
 * └── notifications/   # User notifications
 *
 * Usage:
 * ------
 * import { usePaymentStats, useAgentQuery, QueryProvider } from '@/services/api';
 */

// ============================================================================
// SHARED MODULE
// ============================================================================
export {
  // Config
  API_CONFIG,
  QUERY_CONFIG,
  // Client
  apiClient,
  // Types
  type ApiError,
  type ApiResponse,
  type PaginationParams,
  type PaginatedResponse,
  type FileType,
  // Query Provider
  QueryProvider,
  queryClient,
} from './shared';

// ============================================================================
// PAYMENT MODULE
// ============================================================================
export {
  // Types
  type TrendDirection,
  type StatItem,
  type PaymentStatsResponse,
  type TrendAlertApi,
  type TrendAlertsResponse,
  type RefreshResponse,
  type TimeRange,
  type MetricKey,
  type HistoryDataPoint,
  type MetricHistory,
  type HistoryResponse,
  type HistoryDateRange,
  // API
  paymentApi,
  // Keys
  paymentKeys,
  // Hooks
  usePaymentStats,
  useTrendAlerts,
  useRefreshPaymentData,
  usePaymentData,
  usePaymentHistory,
  usePaymentHistoryByDateRange,
} from './payment';

// ============================================================================
// AGENT MODULE
// ============================================================================
export {
  // Types
  type AgentQueryRequest,
  type AgentQueryResponse,
  // API
  agentApi,
  // Keys
  agentKeys,
  // Hooks
  useAgentQuery,
  useAgentQueryWithCallbacks,
} from './agent';

// ============================================================================
// CONTENT MODULE
// ============================================================================
export {
  // Types
  type ContentDocument,
  type ContentUploadRequest,
  type ContentUploadResponse,
  // API
  contentApi,
  // Keys
  contentKeys,
  // Hooks
  useContent,
  useContentDetail,
  useUploadContent,
  useDeleteContent,
  useDownloadContent,
} from './content';

// ============================================================================
// LEGISLATION MODULE
// ============================================================================
export {
  // Types
  type Legislation,
  type LegislationList,
  // API
  legislationApi,
  // Keys
  legislationKeys,
  // Hooks
  useLegislation,
  useLegislationDetail,
} from './legislation';

// ============================================================================
// MARKET MODULE
// ============================================================================
export {
  // Types
  type MarketTrend,
  type MarketTrendList,
  // API
  marketApi,
  // Keys
  marketKeys,
  // Hooks
  useMarketTrends,
  useMarketTrend,
} from './market';

// ============================================================================
// NOTIFICATIONS MODULE
// ============================================================================
export {
  // Types
  type Notification,
  type NotificationList,
  type NotificationUpdateRequest,
  // API
  notificationsApi,
  // Keys
  notificationsKeys,
  // Hooks
  useNotifications,
  useUnreadNotificationCount,
  useNotificationDetail,
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
  useDeleteNotification,
} from './notifications';

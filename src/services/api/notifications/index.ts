/**
 * Notifications Module
 * ====================
 * API integration for notifications.
 * Used by: Header component, Settings page
 */

// Types
export type {
  Notification,
  NotificationList,
  NotificationUpdateRequest,
} from './notifications.types';

// API
export { notificationsApi } from './notifications.api';

// Keys
export { notificationsKeys } from './notifications.keys';

// Hooks
export {
  useNotifications,
  useUnreadNotificationCount,
  useNotificationDetail,
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
  useDeleteNotification,
} from './notifications.hooks';

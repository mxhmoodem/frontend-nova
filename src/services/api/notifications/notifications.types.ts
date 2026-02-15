/**
 * Notifications Module Types
 * ==========================
 * Type definitions for notifications data.
 * Used by: Header component, Settings page
 */

/**
 * Notification item
 */
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  created_at: string;
  action_url?: string;
}

/**
 * List of notifications
 */
export type NotificationList = Notification[];

/**
 * Request body for updating notification
 */
export interface NotificationUpdateRequest {
  read?: boolean;
  title?: string;
  message?: string;
}

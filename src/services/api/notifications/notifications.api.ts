/**
 * Notifications API Service
 * =========================
 * Handles all notification related API calls.
 * Used by: Header component, Settings page
 */

import { apiClient } from '../shared';
import { NOTIFICATIONS_ENDPOINTS } from './notifications.endpoints';
import type {
  Notification,
  NotificationList,
  NotificationUpdateRequest,
} from './notifications.types';

export const notificationsApi = {
  /**
   * Get all notifications
   */
  getAll: async (): Promise<NotificationList> => {
    return apiClient.get<NotificationList>(NOTIFICATIONS_ENDPOINTS.list);
  },

  /**
   * Get a specific notification by ID
   */
  getById: async (id: string): Promise<Notification> => {
    return apiClient.get<Notification>(NOTIFICATIONS_ENDPOINTS.byId(id));
  },

  /**
   * Update a notification (e.g., mark as read)
   */
  update: async (
    id: string,
    data: NotificationUpdateRequest
  ): Promise<Notification> => {
    return apiClient.patch<Notification>(
      NOTIFICATIONS_ENDPOINTS.byId(id),
      data
    );
  },

  /**
   * Delete a notification
   */
  delete: async (id: string): Promise<void> => {
    return apiClient.delete(NOTIFICATIONS_ENDPOINTS.byId(id));
  },

  /**
   * Mark all notifications as read
   */
  markAllAsRead: async (notifications: NotificationList): Promise<void> => {
    const unreadIds = notifications.filter((n) => !n.read).map((n) => n.id);
    await Promise.all(
      unreadIds.map((id) => notificationsApi.update(id, { read: true }))
    );
  },
};

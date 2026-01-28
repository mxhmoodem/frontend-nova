/**
 * Notification Types and Models
 */

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface NotificationDropDownProps {
  onClose: () => void;
  notifications?: Notification[];
}

/**
 * Get count of unread notifications
 */
export const getUnreadCount = (notifications: Notification[]): number => {
  return notifications.filter((n) => !n.read).length;
};

/**
 * Check if there are any unread notifications
 */
export const hasUnreadNotifications = (
  notifications: Notification[]
): boolean => {
  return getUnreadCount(notifications) > 0;
};

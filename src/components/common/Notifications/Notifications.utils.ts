import { Notification } from './Notifications.model';

// Get count of unread notifications
export const getUnreadCount = (notifications: Notification[]): number => {
  return notifications.filter((n) => !n.read).length;
};

// Check if there are any unread notifications
export const hasUnreadNotifications = (
  notifications: Notification[]
): boolean => {
  return getUnreadCount(notifications) > 0;
};

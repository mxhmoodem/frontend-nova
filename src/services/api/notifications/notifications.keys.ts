/**
 * Notifications Query Keys
 * ========================
 */

export const notificationsKeys = {
  all: ['notifications'] as const,
  lists: () => [...notificationsKeys.all, 'list'] as const,
  unreadCount: () => [...notificationsKeys.all, 'unread-count'] as const,
  detail: (id: string) => [...notificationsKeys.all, 'detail', id] as const,
};

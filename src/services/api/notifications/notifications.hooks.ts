/**
 * Notifications Query Hooks
 * =========================
 * React Query hooks for notifications.
 * Used by: Header component, Settings page
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_CONFIG } from '../shared';
import { notificationsApi } from './notifications.api';
import { notificationsKeys } from './notifications.keys';
import type { Notification, NotificationList } from './notifications.types';

/**
 * Hook to fetch all notifications
 */
export function useNotifications() {
  return useQuery<NotificationList>({
    queryKey: notificationsKeys.lists(),
    queryFn: notificationsApi.getAll,
    staleTime: QUERY_CONFIG.staleTime,
    refetchInterval: QUERY_CONFIG.refetchIntervals.frequent,
  });
}

/**
 * Hook to get unread notification count
 */
export function useUnreadNotificationCount() {
  const { data } = useNotifications();
  return data?.filter((n) => !n.read).length ?? 0;
}

/**
 * Hook to fetch a specific notification by ID
 */
export function useNotificationDetail(id: string) {
  return useQuery<Notification>({
    queryKey: notificationsKeys.detail(id),
    queryFn: () => notificationsApi.getById(id),
    enabled: !!id,
  });
}

/**
 * Hook to mark a notification as read
 */
export function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation<Notification, Error, string>({
    mutationFn: (id: string) => notificationsApi.update(id, { read: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationsKeys.lists() });
    },
  });
}

/**
 * Hook to mark all notifications as read
 */
export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, NotificationList>({
    mutationFn: notificationsApi.markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationsKeys.lists() });
    },
  });
}

/**
 * Hook to delete a notification
 */
export function useDeleteNotification() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: notificationsApi.delete,
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: notificationsKeys.lists() });
      queryClient.removeQueries({
        queryKey: notificationsKeys.detail(deletedId),
      });
    },
  });
}

import { Notification } from './Notifications.model';

export const notificationsConfig: Notification[] = [
  {
    id: '1',
    title: 'Market Alert',
    message: 'AAPL stock price increased by 5%',
    timestamp: '2 minutes ago',
    read: false,
  },
  {
    id: '2',
    title: 'Portfolio Update',
    message: 'Your portfolio performance improved',
    timestamp: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    title: 'System Update',
    message: 'Platform maintenance completed successfully',
    timestamp: '1 day ago',
    read: true,
  },
  {
    id: '1',
    title: 'Market Alert',
    message: 'AAPL stock price increased by 5%',
    timestamp: '2 minutes ago',
    read: false,
  },
  {
    id: '2',
    title: 'Portfolio Update',
    message: 'Your portfolio performance improved',
    timestamp: '1 hour ago',
    read: true,
  },
  {
    id: '3',
    title: 'System Update',
    message: 'Platform maintenance completed successfully',
    timestamp: '1 day ago',
    read: false,
  },
];

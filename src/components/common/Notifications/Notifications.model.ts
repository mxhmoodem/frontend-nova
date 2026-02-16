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

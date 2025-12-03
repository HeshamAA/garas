import { Notification } from '@/shared/types/notification.types';
import { formatNotificationDate } from '../utils/dateFormatter';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

export const NotificationItem = ({ notification, onMarkAsRead }: NotificationItemProps) => {
  return (
    <div
      className={`p-4 hover:bg-accent cursor-pointer transition-colors text-right ${
        !notification.isRead ? 'bg-accent/50' : ''
      }`}
      onClick={() => onMarkAsRead(notification.id)}
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        {!notification.isRead && (
          <div className="w-2 h-2 bg-primary rounded-full mt-1 flex-shrink-0" />
        )}
        <h4 className="font-semibold text-sm">{notification.notification.title}</h4>
      </div>
      <p className="text-sm text-muted-foreground mb-2">
        {notification.notification.message}
      </p>
      <p className="text-xs text-muted-foreground">
        {formatNotificationDate(notification.notification.createdAt)}
      </p>
    </div>
  );
};

import { Notification } from '@/shared/types/notification.types';
import { formatNotificationDate } from '../utils/dateFormatter';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: number) => void;
}

export const NotificationItem = ({ notification, onMarkAsRead }: NotificationItemProps) => {
  const isRead = notification.recipients?.[0]?.isRead ?? false;

  return (
    <div
      className={`p-4 hover:bg-accent cursor-pointer transition-colors text-right ${
        !isRead ? 'bg-accent/50' : ''
      }`}
      onClick={() => onMarkAsRead(notification.id)}
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        {!isRead && (
          <div className="w-2 h-2 bg-primary rounded-full mt-1 flex-shrink-0" />
        )}
        <h4 className="font-semibold text-sm">{notification.title}</h4>
      </div>
      <p className="text-sm text-muted-foreground mb-2">
        {notification.message}
      </p>
      <p className="text-xs text-muted-foreground">
        {formatNotificationDate(notification.createdAt)}
      </p>
    </div>
  );
};

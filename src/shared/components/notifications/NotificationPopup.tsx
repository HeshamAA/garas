import { useState } from 'react';
import { Bell, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useNotifications } from './hooks/useNotifications';
import { NotificationItem } from './components/NotificationItem';

export const NotificationPopup = () => {
  const [open, setOpen] = useState(false);
  const { notifications, loading, unreadCount, markAsRead, markAllAsRead } = useNotifications(open);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-primary-foreground hover:bg-primary-foreground/10"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-lg">الإشعارات</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs"
            >
              تعليم الكل كمقروء
            </Button>
          )}
        </div>
        <ScrollArea className="h-[400px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <Loader2 className="w-8 h-8 mb-2 animate-spin" />
              <p>جاري التحميل...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <Bell className="w-12 h-12 mb-2 opacity-50" />
              <p>لا توجد إشعارات</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={markAsRead}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

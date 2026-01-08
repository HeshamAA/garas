import { useState, useEffect, useCallback, useRef } from 'react';
import { notificationsApi } from '@/shared/api/notifications.api';
import { Notification } from '@/shared/types/notification.types';
import { useToast } from '@/shared/hooks';

export const useNotifications = (open: boolean) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const toastRef = useRef(toast);
  toastRef.current = toast;

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const response = await notificationsApi.getNotifications({ limit: 20 });
      setNotifications(response.data.items);
    } catch (error) {
      toastRef.current.error('فشل في تحميل الإشعارات');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      fetchNotifications();
    }
  }, [open, fetchNotifications]);

  const markAsRead = useCallback(async (id: number) => {
    try {
      await notificationsApi.markAsRead(String(id));
      setNotifications(prev =>
        prev.map(n =>
          n.id === id
            ? { ...n, recipients: n.recipients.map(r => ({ ...r, isRead: true, readAt: new Date().toISOString() })) }
            : n
        )
      );
    } catch (error) {
      toastRef.current.error('فشل في تحديث الإشعار');
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      await notificationsApi.markAllAsRead();
      setNotifications(prev =>
        prev.map(n => ({
          ...n,
          recipients: n.recipients.map(r => ({ ...r, isRead: true, readAt: new Date().toISOString() })),
        }))
      );
      toastRef.current.success('تم تعليم جميع الإشعارات كمقروءة');
    } catch (error) {
      toastRef.current.error('فشل في تحديث الإشعارات');
    }
  }, []);

  const unreadCount = notifications.filter(n => !n.recipients?.[0]?.isRead).length;

  return {
    notifications,
    loading,
    unreadCount,
    markAsRead,
    markAllAsRead,
  };
};

import { useState, useEffect, useCallback } from 'react';
import { notificationsApi } from '@/shared/api/notifications.api';
import { Notification } from '@/shared/types/notification.types';
import { useToast } from '@/shared/hooks';

export const useNotifications = (open: boolean) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const response = await notificationsApi.getNotifications({ limit: 20 });
      setNotifications(response.data.items);
    } catch (error) {
      toast.error('فشل في تحميل الإشعارات');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (open) {
      fetchNotifications();
    }
  }, [open, fetchNotifications]);

  const markAsRead = useCallback(async (id: string) => {
    try {
      await notificationsApi.markAsRead(id);
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, isRead: true, readAt: new Date().toISOString() } : n))
      );
    } catch (error) {
      toast.error('فشل في تحديث الإشعار');
    }
  }, [toast]);

  const markAllAsRead = useCallback(async () => {
    try {
      await notificationsApi.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true, readAt: new Date().toISOString() })));
      toast.success('تم تعليم جميع الإشعارات كمقروءة');
    } catch (error) {
      toast.error('فشل في تحديث الإشعارات');
    }
  }, [toast]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return {
    notifications,
    loading,
    unreadCount,
    markAsRead,
    markAllAsRead,
  };
};

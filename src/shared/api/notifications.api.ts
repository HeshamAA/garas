import { createApiService } from './createApiService';
import { Notification, NotificationsResponse, NotificationParams } from '../types/notification.types';
import { API_ENDPOINTS, buildEndpoint } from './apiEndpoints';

// Create base service instance
const baseService = createApiService<Notification, NotificationsResponse>(
  API_ENDPOINTS.notifications
);

// Extend with custom methods
export const notificationsApi = {
  /**
   * Get notifications for the current user
   */
  getNotifications: async (params?: NotificationParams): Promise<NotificationsResponse> => {
    return baseService.customRequest<NotificationsResponse>(
      'GET',
      '/me',
      undefined,
      {
        page: params?.page || 1,
        limit: params?.limit || 10,
      }
    );
  },

  /**
   * Mark a specific notification as read
   */
  markAsRead: async (notificationId: string): Promise<Notification> => {
    return baseService.customRequest<Notification>(
      'PATCH',
      `/${notificationId}/read`
    );
  },

  /**
   * Mark all notifications as read
   */
  markAllAsRead: async (): Promise<{ message: string }> => {
    return baseService.customRequest<{ message: string }>(
      'PATCH',
      '/read-all'
    );
  },
};

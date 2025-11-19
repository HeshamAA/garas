import { apiClient, handleApiError, handleApiResponse } from './apiClient';
import { Notification, NotificationsResponse, NotificationParams } from '../types/notification.types';

export const notificationsApi = {
  getNotifications: async (params?: NotificationParams): Promise<NotificationsResponse> => {
    try {
      const response = await apiClient.get<NotificationsResponse>('https://school.safehandapps.com/api/v1/notifications/me', {
        params: {
          page: params?.page || 1,
          limit: params?.limit || 10,
        },
      });
     
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  markAsRead: async (notificationId: string): Promise<Notification> => {
    try {
      const response = await apiClient.patch<Notification>(
        `https://school.safehandapps.com/api/v1/notifications/${notificationId}/read`
      );
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  markAllAsRead: async (): Promise<{ message: string }> => {
    try {
      const response = await apiClient.patch<{ message: string }>(
        'https://school.safehandapps.com/api/v1/notifications/read-all'
      );
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};

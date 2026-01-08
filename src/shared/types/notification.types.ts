export interface Notification {
  id: number;
  title: string;
  message: string;
  createdAt: string;
  type: string;
  scheduledAt: string;
  navigationData?: {
    params: { id: number };
    screen: string;
  };
  recipients: {
    user: { id: number };
    isRead: boolean;
    readAt: string | null;
  }[];
}

export interface NotificationsResponse {
  success: boolean;
  message: string;
  data: { items: Notification[] };
  metadata: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
  links: {
    hasNext: boolean;
  };
  unreadCount: number;
}

export interface NotificationParams {
  page?: number;
  limit?: number;
}

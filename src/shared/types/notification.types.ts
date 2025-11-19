export interface Notification {
  id: string;
  notification: {
    title: string;
    message: string;
    createdAt: string;
  };
  user: {
    id: string;
    name: string;
  };
  isRead: boolean;
  readAt: string | null;
}

export interface NotificationsResponse {
  data:{items:Notification[]}
  metadata: {
    currentPage:number
    itemsPerPage:number
    totalItems:number
    totalPages:number
  };
  links:{
    hasNext:boolean
  }
  
unreadCount:number

}

export interface NotificationParams {
  page?: number;
  limit?: number;
}

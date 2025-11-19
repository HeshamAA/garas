export interface SchoolStatistics {
  totalStudents: number;
  totalDeliveryPersons: number;
  totalParents: number;
  totalRequests: number;
  pendingRequestsToday: number;
  deliveredRequestsToday: number;
  waitingOutsideRequestsToday: number;
  cancelledRequestsToday: number;
}

export interface StatisticsResponse {
  success: boolean;
  message: string;
  data: SchoolStatistics;
}

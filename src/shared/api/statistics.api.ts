import { apiClient } from './apiClient';
import { StatisticsResponse } from '../types/statistics.types';
import { API_ENDPOINTS } from './apiEndpoints';

// Statistics API uses direct apiClient since it has specific endpoints
// that don't follow standard CRUD patterns
export const statisticsApi = {
  /**
   * Get statistics for school dashboard
   */
  getSchoolStatistics: async (): Promise<StatisticsResponse> => {
    const response = await apiClient.get<StatisticsResponse>(API_ENDPOINTS.school.statistics);
    return response.data;
  },

  /**
   * Get statistics for super admin dashboard
   */
  getSuperAdminStatistics: async (): Promise<StatisticsResponse> => {
    const response = await apiClient.get<StatisticsResponse>(API_ENDPOINTS.superAdmin.statistics);
    return response.data;
  },
};

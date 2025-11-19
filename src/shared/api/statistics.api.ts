import { apiClient, handleApiError, handleApiResponse } from './apiClient';
import { StatisticsResponse } from '../types/statistics.types';

export const statisticsApi = {
  getSchoolStatistics: async (): Promise<StatisticsResponse> => {
    try {
      const response = await apiClient.get<StatisticsResponse>('https://school.safehandapps.com/api/v1/school/statistics');
   
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};

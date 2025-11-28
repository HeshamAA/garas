import { apiClient, handleApiError, handleApiResponse } from './apiClient';

const ENDPOINTS = {
  school: 'https://school.safehandapps.com/api/v1/school',
} as const;

export const schoolsApi = {
  /**
   * Toggle activation status for a school (admin)
   * PATCH /api/v1/school/{id}/status
   */
  toggleStatus: async (id: string | number): Promise<{ message: string; success: boolean }> => {
    try {
      const response = await apiClient.patch<{ message: string; success: boolean }>(
        `${ENDPOINTS.school}/${id}/status`
      );
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};

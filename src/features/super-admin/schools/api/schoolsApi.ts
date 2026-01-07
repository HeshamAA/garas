import { apiClient } from '@/shared/api/apiClient';
import { API_CONFIG } from '@/shared/api/apiConfig';
import { 
  RegisterSchoolRequest,
  SearchSchoolsRequest,
  SchoolsApiResponse,
  SchoolApiResponse
} from '../types/school.types';

const ENDPOINTS = {
  schools: `${API_CONFIG.baseURL}/api/v1/school`,

};

export interface GetSchoolsParams {
  keyword?: string;
  name?: string;
  location?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export const schoolsApi = {
  async getAll(params?: GetSchoolsParams): Promise<SchoolsApiResponse> {
    const response = await apiClient.get<SchoolsApiResponse>(
      ENDPOINTS.schools,
      { params }
    );
    return response.data;
  },

  async toggleStatus(id: number): Promise<{ message: string; success: boolean }> {
    const response = await apiClient.patch<{ message: string; success: boolean }>(
      `${ENDPOINTS.schools}/${id}/status`
    );
    return response.data;
  },
};
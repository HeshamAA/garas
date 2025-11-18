import { apiClient } from '@/shared/api/apiClient';
import { 
  RegisterSchoolRequest,
  SearchSchoolsRequest,
  SchoolsApiResponse,
  SchoolApiResponse
} from '../types/school.types';

const ENDPOINTS = {
  schools: 'https://school.safehandapps.com/api/v1/school',

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
};
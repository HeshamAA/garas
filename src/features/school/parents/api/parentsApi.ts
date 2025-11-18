import { apiClient } from '@/shared/api/apiClient';
import { 
  ParentsApiResponse,
  ParentApiResponse
} from '../types/parent.types';

export interface GetParentsParams {
  keyword?: string;
  fullName?: string;
  nationalId?: string;
  userId?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

const ENDPOINTS = {
  parents: 'https://school.safehandapps.com/api/v1/user/parents',
  parentById: (id: string) => `https://school.safehandapps.com/api/v1/user/parents/${id}`,
};

export const parentsApi = {
  async getAll(params?: GetParentsParams): Promise<ParentsApiResponse> {
    const response = await apiClient.get<ParentsApiResponse>(
      ENDPOINTS.parents,
      { params }
    );
    return response.data;
  },


  async getById(id: string): Promise<ParentApiResponse> {
    const response = await apiClient.get<ParentApiResponse>(
      ENDPOINTS.parentById(id)
    );
    return response.data;
  },


  async delete(id: string): Promise<void> {
    await apiClient.delete(ENDPOINTS.parentById(id));
  },
};
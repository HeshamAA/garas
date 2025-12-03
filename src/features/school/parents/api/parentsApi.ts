import { createApiService } from '@/shared/api/createApiService';
import { API_ENDPOINTS } from '@/shared/api/apiEndpoints';
import {
  ParentsApiResponse,
  ParentApiResponse
} from '../types/parent.types';
import type { BaseQueryParams } from '@/shared/api/createApiService';

export interface GetParentsParams extends BaseQueryParams {
  fullName?: string;
  nationalId?: string;
  userId?: number;
}

// Create base API service using generic factory
const baseParentsApi = createApiService<
  any,
  ParentsApiResponse,
  ParentApiResponse,
  GetParentsParams
>(API_ENDPOINTS.school.parents);

// Export API with all generic methods
export const parentsApi = {
  getAll: baseParentsApi.getAll.bind(baseParentsApi),
  getById: baseParentsApi.getById.bind(baseParentsApi),
  delete: baseParentsApi.delete.bind(baseParentsApi),
};
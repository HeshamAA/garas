import { createApiService } from '@/shared/api/createApiService';
import { API_ENDPOINTS } from '@/shared/api/apiEndpoints';
import {
  ReceiversApiResponse
} from '../types/receiver.types';
import type { BaseQueryParams } from '@/shared/api/createApiService';

export interface GetReceiversParams extends BaseQueryParams {
  fullName?: string;
  nationalId?: string;
  userId?: number;
}

// Create base API service using generic factory
const baseReceiversApi = createApiService<
  any,
  ReceiversApiResponse,
  any,
  GetReceiversParams
>(API_ENDPOINTS.school.receivers);

// Export API with all generic methods
export const receiversApi = {
  getAll: baseReceiversApi.getAll.bind(baseReceiversApi),
  delete: baseReceiversApi.delete.bind(baseReceiversApi),
};
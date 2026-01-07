/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from '@/shared/api/apiClient';
import {
  RequestsApiResponse,
  SchoolRequestsApiResponse,

} from '../types/request.types';

export interface GetRequestsParams {
  keyword?: string;
  studentId?: number;
  deliveryId?: number;
  howToReceive?: string;
  status?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

const ENDPOINTS = {
  userRequests: (userId: string) => `https://school.safehandapps.com/api/v1/req-for-receipt`,
  schoolRequests: () => `https://school.safehandapps.com/api/v1/req-for-receipt`,
  requestById: (id: string) => `https://school.safehandapps.com/api/v1/req-for-receipt/${id}`,
  updateRequestStatus: (id: number) => `https://school.safehandapps.com/api/v1/req-for-receipt/status/${id}`,
};

export const requestsApi = {
  
  async getUserRequests(userId: string, params?: GetRequestsParams): Promise<RequestsApiResponse> {
    const response = await apiClient.get<RequestsApiResponse>(
      ENDPOINTS.userRequests(userId),
      { params }
    );
    return response.data;
  },

  async getSchoolRequests(params?: GetRequestsParams): Promise<SchoolRequestsApiResponse> {
    const response = await apiClient.get<SchoolRequestsApiResponse>(
      ENDPOINTS.schoolRequests(),
      { params }
    );
    return response.data;
  },

  async getRequestById(id: string): Promise<{ data: any }> {
    const response = await apiClient.get(ENDPOINTS.requestById(id));
    return response.data;
  },

  async updateRequestStatus(id: number, status: string, cancellationReason?: string): Promise<{ data: any; message: string }> {
    const body: { status: string; cancellationReason?: string } = { status };
    if (cancellationReason) {
      body.cancellationReason = cancellationReason;
    }
    const response = await apiClient.patch(
      ENDPOINTS.updateRequestStatus(id),
      body
    );
    return response.data;
  },
};
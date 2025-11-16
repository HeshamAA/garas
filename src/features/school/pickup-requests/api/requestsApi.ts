import { apiClient } from '@/shared/api/apiClient';
import {
  CreateRequestPayload,
  RequestsApiResponse,
  SchoolRequestsApiResponse,
  RequestApiResponse,
} from '../types/request.types';

const ENDPOINTS = {
  userRequests: (userId: string) => `/users/${userId}/requests`,
  schoolRequests: (schoolId: string) => `/schools/${schoolId}/requests`,
  requests: '/requests',
  requestById: (id: string) => `/requests/${id}`,
  approveRequest: (id: string) => `/requests/${id}/approve`,
  rejectRequest: (id: string) => `/requests/${id}/reject`,
  completeRequest: (id: string) => `/requests/${id}/complete`,
};

export const requestsApi = {
  /**
   * Get all requests for a user (parent/guardian)
   */
  async getUserRequests(userId: string): Promise<RequestsApiResponse> {
    const response = await apiClient.get<RequestsApiResponse>(
      ENDPOINTS.userRequests(userId)
    );
    return response.data;
  },

  /**
   * Get all requests for a school
   */
  async getSchoolRequests(schoolId: string): Promise<SchoolRequestsApiResponse> {
    const response = await apiClient.get<SchoolRequestsApiResponse>(
      ENDPOINTS.schoolRequests(schoolId)
    );
    return response.data;
  },

  /**
   * Get a request by ID
   */
  async getById(id: string): Promise<RequestApiResponse> {
    const response = await apiClient.get<RequestApiResponse>(
      ENDPOINTS.requestById(id)
    );
    return response.data;
  },

  /**
   * Create a new pickup request
   */
  async createRequest(requestData: CreateRequestPayload): Promise<RequestApiResponse> {
    const response = await apiClient.post<RequestApiResponse>(
      ENDPOINTS.requests,
      requestData
    );
    return response.data;
  },

  /**
   * Approve a pickup request
   */
  async approveRequest(id: string, reason?: string): Promise<RequestApiResponse> {
    const response = await apiClient.post<RequestApiResponse>(
      ENDPOINTS.approveRequest(id),
      { reason }
    );
    return response.data;
  },

  /**
   * Reject a pickup request
   */
  async rejectRequest(id: string, reason?: string): Promise<RequestApiResponse> {
    const response = await apiClient.post<RequestApiResponse>(
      ENDPOINTS.rejectRequest(id),
      { reason }
    );
    return response.data;
  },

  /**
   * Complete a pickup request
   */
  async completeRequest(id: string): Promise<RequestApiResponse> {
    const response = await apiClient.post<RequestApiResponse>(
      ENDPOINTS.completeRequest(id)
    );
    return response.data;
  },

  /**
   * Delete a request
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(ENDPOINTS.requestById(id));
  },
};
import { apiClient } from '@/shared/api/apiClient';
import { 
  Receiver, 
  TrustedReceiver,
  CreateReceiverData,
  UpdateReceiverData,
} from '../types/receiver.types';

interface ReceiversApiResponse {
  data: Receiver[];
  success: boolean;
  message?: string;
}

interface ReceiverApiResponse {
  data: Receiver;
  success: boolean;
  message?: string;
}

interface TrustedReceiversApiResponse {
  data: TrustedReceiver[];
  success: boolean;
  message?: string;
}

interface TrustedReceiverApiResponse {
  data: TrustedReceiver;
  success: boolean;
  message?: string;
}

const ENDPOINTS = {
  receivers: '/receivers',
  receiverById: (id: string) => `/receivers/${id}`,
  receiverStatus: (id: string) => `/receivers/${id}/status`,
  receiversBySchool: (schoolId: string) => `/schools/${schoolId}/receivers`,

  trustedReceivers: '/trusted-receivers',
  trustedReceiverById: (id: string) => `/trusted-receivers/${id}`,
  trustedReceiverStatus: (id: string) => `/trusted-receivers/${id}/status`,
  trustedReceiversBySchool: (schoolId: string) => `/schools/${schoolId}/trusted-receivers`,
  approveTrustedReceiver: (id: string) => `/trusted-receivers/${id}/approve`,
  rejectTrustedReceiver: (id: string) => `/trusted-receivers/${id}/reject`,
};

export const receiversApi = {
  /**
   * Get all receivers for a school
   */
  async getAll(schoolId: string): Promise<ReceiversApiResponse> {
    const response = await apiClient.get<ReceiversApiResponse>(
      ENDPOINTS.receiversBySchool(schoolId)
    );
    return response.data;
  },

  /**
   * Get a receiver by ID
   */
  async getById(id: string): Promise<ReceiverApiResponse> {
    const response = await apiClient.get<ReceiverApiResponse>(
      ENDPOINTS.receiverById(id)
    );
    return response.data;
  },

  /**
   * Create a new receiver
   */
  async create(receiverData: CreateReceiverData): Promise<ReceiverApiResponse> {
    const response = await apiClient.post<ReceiverApiResponse>(
      ENDPOINTS.receivers,
      receiverData
    );
    return response.data;
  },

  /**
   * Update a receiver
   */
  async update(id: string, receiverData: Partial<UpdateReceiverData>): Promise<ReceiverApiResponse> {
    const response = await apiClient.put<ReceiverApiResponse>(
      ENDPOINTS.receiverById(id),
      receiverData
    );
    return response.data;
  },

  /**
   * Update receiver status
   */
  async updateStatus(id: string, status: 'active' | 'inactive'): Promise<ReceiverApiResponse> {
    const response = await apiClient.patch<ReceiverApiResponse>(
      ENDPOINTS.receiverStatus(id),
      { status }
    );
    return response.data;
  },

  /**
   * Delete a receiver
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(ENDPOINTS.receiverById(id));
  },

  /**
   * Get all trusted receivers for a school
   */
  async getAllTrusted(schoolId: string): Promise<TrustedReceiversApiResponse> {
    const response = await apiClient.get<TrustedReceiversApiResponse>(
      ENDPOINTS.trustedReceiversBySchool(schoolId)
    );
    return response.data;
  },

  /**
   * Get a trusted receiver by ID
   */
  async getTrustedById(id: string): Promise<TrustedReceiverApiResponse> {
    const response = await apiClient.get<TrustedReceiverApiResponse>(
      ENDPOINTS.trustedReceiverById(id)
    );
    return response.data;
  },

  /**
   * Approve a trusted receiver
   */
  async approveTrusted(id: string): Promise<TrustedReceiverApiResponse> {
    const response = await apiClient.post<TrustedReceiverApiResponse>(
      ENDPOINTS.approveTrustedReceiver(id)
    );
    return response.data;
  },

  /**
   * Reject a trusted receiver
   */
  async rejectTrusted(id: string): Promise<void> {
    await apiClient.post(ENDPOINTS.rejectTrustedReceiver(id));
  },

  /**
   * Update trusted receiver status
   */
  async updateTrustedStatus(id: string, status: 'active' | 'inactive'): Promise<TrustedReceiverApiResponse> {
    const response = await apiClient.patch<TrustedReceiverApiResponse>(
      ENDPOINTS.trustedReceiverStatus(id),
      { status }
    );
    return response.data;
  },

  /**
   * Delete a trusted receiver
   */
  async deleteTrusted(id: string): Promise<void> {
    await apiClient.delete(ENDPOINTS.trustedReceiverById(id));
  },
};
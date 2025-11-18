import { apiClient } from '@/shared/api/apiClient';
import { 
ReceiversApiResponse
} from '../types/receiver.types';





export interface GetReceiversParams {
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
  receivers: 'https://school.safehandapps.com/api/v1/delivery-person',
  receiverById: (id: string) => `/receivers/${id}`,
};

export const receiversApi = {
  async getAll(params?: GetReceiversParams): Promise<ReceiversApiResponse> {
    const response = await apiClient.get<ReceiversApiResponse>(
      ENDPOINTS.receivers,
      { params }
    );
    return response.data;
  },



  async delete(id: string): Promise<void> {
    await apiClient.delete(ENDPOINTS.receiverById(id));
  },


};
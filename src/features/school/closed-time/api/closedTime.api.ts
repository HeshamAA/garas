import { apiClient } from '@/shared/api/apiClient';

export interface ClosedTimeData {
  closedTime: string | null;
}

export interface ClosedTimeResponse {
  success: boolean;
  message: string;
  data: ClosedTimeData;
}

export interface UpdateClosedTimeRequest {
  closedTime: string;
}

export const closedTimeApi = {
  getClosedTime: async (): Promise<ClosedTimeData> => {
    const response = await apiClient.get<ClosedTimeResponse>('/api/v1/school/closed-time');
    return response.data.data;
  },

  updateClosedTime: async (data: UpdateClosedTimeRequest): Promise<ClosedTimeData> => {
    const response = await apiClient.patch<ClosedTimeResponse>('/api/v1/school/closed-time', data);
    return response.data.data;
  },
};

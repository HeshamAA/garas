import { apiClient, handleApiError, handleApiResponse } from '@/shared/api/apiClient';

export interface SuperAdminStatistics {
  totalSchools: number;        
  activeSchools: number;        
  pendingSchools: number;       
  newSchoolsThisWeek: number;   
  newSchoolsThisMonth: number;  
}

export interface SchoolGrowthData {
  month: string;  
  count: number;  
}

export interface SchoolDistribution {
  region: string;  
  count: number;   
}

export interface RecentSchool {
  id: number;
  name: string;
  location: string;
  status: 'active' | 'pending';
  createdAt: string;
}

export const superAdminDashboardApi = {
  
  async getStatistics(): Promise<{ data: SuperAdminStatistics }> {
    try {
      const response = await apiClient.get<{ data: SuperAdminStatistics }>(
        '/api/v1/super-admin/schools/statistics'
      );
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  async getSchoolGrowth(period: 'year' | 'month' = 'year'): Promise<{ data: SchoolGrowthData[] }> {
    try {
      const response = await apiClient.get<{ data: SchoolGrowthData[] }>(
        '/api/v1/super-admin/schools/growth',
        { params: { period } }
      );
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  async getSchoolDistribution(): Promise<{ data: SchoolDistribution[] }> {
    try {
      const response = await apiClient.get<{ data: SchoolDistribution[] }>(
        '/api/v1/super-admin/schools/distribution'
      );
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  async getRecentSchools(limit: number = 5): Promise<{ data: RecentSchool[] }> {
    try {
      const response = await apiClient.get<{ data: RecentSchool[] }>(
        '/api/v1/super-admin/schools/recent',
        { params: { limit } }
      );
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};

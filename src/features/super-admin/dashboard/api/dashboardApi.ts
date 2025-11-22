import { apiClient, handleApiError, handleApiResponse } from '@/shared/api/apiClient';


export interface SuperAdminStatistics {
  totalSchools: number;          
  activeSchools: number;
  suspendedSchools?: number;        
  pendingSchools: number;        
  newThisWeek: number;             
  newThisMonth: number;            
  activatedToday: number;          
  schoolsByRegion: SchoolByRegion[];
  recentSchools: RecentSchool[];
}


export interface SchoolByRegion {
  region: string;  
  count: number;   
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
  logo?: string;
  status: 'active' | 'pending' | 'suspended';
  createdAt: string;
}

export const superAdminDashboardApi = {
 
  async getStatistics(): Promise<{ success: boolean; message: string; data: SuperAdminStatistics }> {
    try {
      const response = await apiClient.get<{ success: boolean; message: string; data: SuperAdminStatistics }>(
        'https://school.safehandapps.com/api/v1/school/dashboard'
      );
      console.log(response)
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },


};

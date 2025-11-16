import { apiClient } from '@/shared/api/apiClient';
import { 
  RegisterSchoolRequest,
  SearchSchoolsRequest,
  SchoolsApiResponse,
  SchoolApiResponse
} from '../types/school.types';

const ENDPOINTS = {
  schools: '/schools',
  schoolById: (id: string) => `/schools/${id}`,
  userSchools: (userId: string) => `/users/${userId}/schools`,
  searchSchools: '/schools/search',
  registerSchool: '/schools/register',
};

export const schoolsApi = {
  /**
   * Get all schools for a user
   */
  async getAll(userId: string): Promise<SchoolsApiResponse> {
    const response = await apiClient.get<SchoolsApiResponse>(
      ENDPOINTS.userSchools(userId)
    );
    return response.data;
  },

  /**
   * Search schools
   */
  async search(searchParams: SearchSchoolsRequest): Promise<SchoolsApiResponse> {
    const response = await apiClient.post<SchoolsApiResponse>(
      ENDPOINTS.searchSchools,
      searchParams
    );
    return response.data;
  },

  /**
   * Get a school by ID
   */
  async getById(id: string): Promise<SchoolApiResponse> {
    const response = await apiClient.get<SchoolApiResponse>(
      ENDPOINTS.schoolById(id)
    );
    return response.data;
  },

  /**
   * Register a new school
   */
  async register(schoolData: RegisterSchoolRequest): Promise<SchoolApiResponse> {
    const response = await apiClient.post<SchoolApiResponse>(
      ENDPOINTS.registerSchool,
      schoolData
    );
    return response.data;
  },
};
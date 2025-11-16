import { apiClient } from '@/shared/api/apiClient';
import { 
  Parent,
  CreateParentRequest,
  UpdateParentRequest,
  ParentsApiResponse,
  ParentApiResponse
} from '../types/parent.types';

const ENDPOINTS = {
  parents: '/parents',
  parentById: (id: string) => `/parents/${id}`,
  parentsBySchool: (schoolId: string) => `/schools/${schoolId}/parents`,
};

export const parentsApi = {
  /**
   * Get all parents for a school
   */
  async getAll(schoolId: string): Promise<ParentsApiResponse> {
    const response = await apiClient.get<ParentsApiResponse>(
      ENDPOINTS.parentsBySchool(schoolId)
    );
    return response.data;
  },

  /**
   * Get a parent by ID
   */
  async getById(id: string): Promise<ParentApiResponse> {
    const response = await apiClient.get<ParentApiResponse>(
      ENDPOINTS.parentById(id)
    );
    return response.data;
  },

  /**
   * Create a new parent
   */
  async create(parentData: CreateParentRequest): Promise<ParentApiResponse> {
    const response = await apiClient.post<ParentApiResponse>(
      ENDPOINTS.parents,
      parentData
    );
    return response.data;
  },

  /**
   * Update a parent
   */
  async update(parentData: UpdateParentRequest): Promise<ParentApiResponse> {
    const { id, ...data } = parentData;
    const response = await apiClient.put<ParentApiResponse>(
      ENDPOINTS.parentById(id),
      data
    );
    return response.data;
  },

  /**
   * Delete a parent
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(ENDPOINTS.parentById(id));
  },
};
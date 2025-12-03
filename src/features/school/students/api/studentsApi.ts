import { createApiService } from '@/shared/api/createApiService';
import { API_ENDPOINTS } from '@/shared/api/apiEndpoints';
import {
  StudentStatus,
  StudentsApiResponse,
  StudentApiResponse
} from '../types/student.types';
import type { BaseQueryParams } from '@/shared/api/createApiService';

export interface GetStudentsParams extends BaseQueryParams {
  fullName?: string;
  code?: string;
  schoolId?: number;
  parentId?: number;
  stage?: string;
  class?: string;
}

// Create base API service using generic factory
const baseStudentsApi = createApiService<
  any,
  StudentsApiResponse,
  StudentApiResponse,
  GetStudentsParams
>(API_ENDPOINTS.school.students);

// Export API with custom methods
export const studentsApi = {
  // Use generic methods
  getAll: baseStudentsApi.getAll.bind(baseStudentsApi),
  getById: baseStudentsApi.getById.bind(baseStudentsApi),
  delete: baseStudentsApi.delete.bind(baseStudentsApi),

  // Custom method for updating status
  async updateStatus(id: string, status: StudentStatus): Promise<StudentApiResponse> {
    return baseStudentsApi.patch(id, { status });
  },
};
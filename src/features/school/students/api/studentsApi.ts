import { apiClient } from '@/shared/api/apiClient';
import { 
  StudentStatus,

  StudentsApiResponse,
  StudentApiResponse
} from '../types/student.types';

export interface GetStudentsParams {
  keyword?: string;
  fullName?: string;
  code?: string;
  schoolId?: number;
  parentId?: number;
  stage?: string;
  class?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

const ENDPOINTS = {
  students: 'https://school.safehandapps.com/api/v1/student',
  studentById: (id: string) => `/students/${id}`,
  studentStatus: (id: string) => `/students/${id}/status`,
  studentsBySchool: (schoolId: string) => `/schools/${schoolId}/students`,
};

export const studentsApi = {
  async getAll(params?: GetStudentsParams): Promise<StudentsApiResponse> {
    const response = await apiClient.get<StudentsApiResponse>(
      ENDPOINTS.students,
      { params }
    );
    return response.data;
  },

  async getById(id: string): Promise<StudentApiResponse> {
    const response = await apiClient.get<StudentApiResponse>(
      ENDPOINTS.studentById(id)
    );
    return response.data;
  },

  async updateStatus(id: string, status: StudentStatus): Promise<StudentApiResponse> {
    const response = await apiClient.patch<StudentApiResponse>(
      ENDPOINTS.studentStatus(id),
      { status }
    );
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(ENDPOINTS.studentById(id));
  },
};
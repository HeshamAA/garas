import { apiClient } from '@/shared/api/apiClient';
import { 
  Student, 
  StudentStatus,
  CreateStudentRequest,
  UpdateStudentRequest,
  StudentsApiResponse,
  StudentApiResponse
} from '../types/student.types';

const ENDPOINTS = {
  students: '/students',
  studentById: (id: string) => `/students/${id}`,
  studentStatus: (id: string) => `/students/${id}/status`,
  studentsBySchool: (schoolId: string) => `/schools/${schoolId}/students`,
};

export const studentsApi = {
  /**
   * Get all students for a school
   */
  async getAll(schoolId: string): Promise<StudentsApiResponse> {
    const response = await apiClient.get<StudentsApiResponse>(
      ENDPOINTS.studentsBySchool(schoolId)
    );
    return response.data;
  },

  /**
   * Get a student by ID
   */
  async getById(id: string): Promise<StudentApiResponse> {
    const response = await apiClient.get<StudentApiResponse>(
      ENDPOINTS.studentById(id)
    );
    return response.data;
  },

  /**
   * Create a new student
   */
  async create(studentData: CreateStudentRequest): Promise<StudentApiResponse> {
    const response = await apiClient.post<StudentApiResponse>(
      ENDPOINTS.students,
      studentData
    );
    return response.data;
  },

  /**
   * Update a student
   */
  async update(studentData: UpdateStudentRequest): Promise<StudentApiResponse> {
    const { id, ...data } = studentData;
    const response = await apiClient.put<StudentApiResponse>(
      ENDPOINTS.studentById(id),
      data
    );
    return response.data;
  },

  /**
   * Update student status
   */
  async updateStatus(id: string, status: StudentStatus): Promise<StudentApiResponse> {
    const response = await apiClient.patch<StudentApiResponse>(
      ENDPOINTS.studentStatus(id),
      { status }
    );
    return response.data;
  },

  /**
   * Delete a student
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(ENDPOINTS.studentById(id));
  },
};
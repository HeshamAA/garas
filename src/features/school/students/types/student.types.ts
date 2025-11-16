export type StudentStatus = 'active' | 'inactive' | 'pending';

export interface Student {
  id: string;
  name: string;
  avatar?: string;
  status: StudentStatus;
  location: string;
  guardianId: string;
  guardianName: string;
  receiverId?: string;
  receiverName?: string;
  lastUpdate: Date;
  time?: string;
  date?: string;
  role?: string;
}

export interface StudentFilters {
  status?: StudentStatus | 'all';
  searchQuery?: string;
}

export interface CreateStudentRequest {
  name: string;
  guardianId: string;
  guardianName: string;
  location: string;
  receiverId?: string;
  receiverName?: string;
  avatar?: string;
}

export interface UpdateStudentRequest {
  id: string;
  name?: string;
  location?: string;
  receiverId?: string;
  receiverName?: string;
  avatar?: string;
}

export interface UpdateStudentStatusRequest {
  id: string;
  status: StudentStatus;
}

export interface StudentsApiResponse {
  data: Student[];
  message?: string;
  success: boolean;
}

export interface StudentApiResponse {
  data: Student;
  message?: string;
  success: boolean;
}
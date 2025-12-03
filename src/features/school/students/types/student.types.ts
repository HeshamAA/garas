export type StudentStatus = 'active' | 'inactive' | 'pending';

export interface Student {
  id: number;
  fullName: string;
  code: string;
  class: string;
  stage: string;
  dateOfBirth: string;
  profileImage?: string;
  name?: string;
  avatar?: string;
  status?: StudentStatus;
  location?: string;
  guardianId?: string;
  guardianName?: string;
  receiverId?: string;
  receiverName?: string;
  lastUpdate?: Date;
  time?: string;
  date?: string;
  role?: string;
  school?: {
    name: string;
    logo: string;
    location: string;
  };
  parent?: {
    fullName: string;
    phoneNumber: string;
    email?: string;
    profileImage?: string;
  };
}

export interface StudentCardProps {
  student: Student;
  onViewRequests?: (studentId: number) => void;
}

export interface StudentFilters {
  status?: StudentStatus | 'all';
  searchQuery?: string;
}

export interface data {
      items:Student[]
      links:{
        hasNext:boolean
        next:string
        last:string
      }
      metadata:{
          currentPage:number
    itemsPerPage:number
    totalItems:number
    totalPages:number
      }
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
  data: data;
  message?: string;
  success: boolean;
}

export interface StudentApiResponse {
  data: data;
  message?: string;
  success: boolean;
}
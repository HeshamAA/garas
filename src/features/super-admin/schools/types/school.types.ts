export type SchoolStatus = 'active' | 'inactive' | 'pending';

export interface School {
  id: string;
  name: string;
  location: string;
  phone?: string;
  email?: string;
  avatar?: string;
  registrationDate: Date;
  status: SchoolStatus;
  studentsCount?: number;
  period?: string;
  transportType?: string;
  requestNumber?: string;
  statusColor?: string;
}

export interface SchoolFilters {
  status?: SchoolStatus | 'all';
  searchQuery?: string;
}

export interface RegisterSchoolRequest {
  name: string;
  location: string;
  phone?: string;
  email?: string;
  transportType?: string;
}

export interface UpdateSchoolRequest {
  id: string;
  name?: string;
  location?: string;
  phone?: string;
  email?: string;
  avatar?: string;
}

export interface SchoolsApiResponse {
  data: School[];
  message?: string;
  success: boolean;
}

export interface SchoolApiResponse {
  data: School;
  message?: string;
  success: boolean;
}

export interface SearchSchoolsRequest {
  query: string;
  location?: string;
}
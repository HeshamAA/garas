export type SchoolStatus = 'active' | 'inactive' | 'pending';

export interface School {
  id: number;
  name: string;
  location: string;
  description?: string;
  logo?: string;
  stages?: string[];
  createdAt: string;
  updatedAt: string;
  phone?: string;
  email?: string;
  avatar?: string;
  registrationDate?: Date;
  status?: SchoolStatus;
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

export interface data{
      items:School[]
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
export interface UpdateSchoolRequest {
  id: string;
  name?: string;
  location?: string;
  phone?: string;
  email?: string;
  avatar?: string;
}

export interface SchoolsApiResponse {
  data: data;
  message?: string;
  success: boolean;
}

export interface SchoolApiResponse {
  data: data;
  message?: string;
  success: boolean;
}

export interface SearchSchoolsRequest {
  query: string;
  location?: string;
}
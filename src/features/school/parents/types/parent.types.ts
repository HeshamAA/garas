export interface Parent {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  avatar?: string;
  studentIds: string[];
  students: string[];
}

export interface ParentFilters {
  searchQuery?: string;
}

export interface CreateParentRequest {
  name: string;
  role: string;
  phone: string;
  email: string;
  avatar?: string;
  studentIds: string[];
}

export interface UpdateParentRequest {
  id: string;
  name?: string;
  role?: string;
  phone?: string;
  email?: string;
  avatar?: string;
  studentIds?: string[];
}

export interface ParentsApiResponse {
  data: Parent[];
  success: boolean;
  message?: string;
}

export interface ParentApiResponse {
  data: Parent;
  success: boolean;
  message?: string;
}
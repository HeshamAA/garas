
export interface Student {
  id: number;
  fullName: string;
  class: string;
  code: string;
  profileImage: string;
  stage: string;
  school: {
    id: number;
    name: string;
    logo: string;
  };
}

export interface Parent {
  id: number;
  fullName: string;
  nationalId: string;
  nationalIdBack: string | null;
  nationalIdFront: string | null;
  profileImage: string | null;
  students: Student[];
  user: {
    id: number;
    email: string;
    phoneNumber: string;
    role: string;
  };
}

export interface ParentFilters {
  searchQuery?: string;
}

export interface data {
  items: Parent[]
  links:{
    hasNext : boolean
  }
  metadata:{
    currentPage:number
    itemsPerPage:number
    totalItems:number
    totalPages:number
  }
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
  data: data;
  success: boolean;
  message?: string;
}

export interface ParentApiResponse {
  data: Parent;
  success: boolean;
  message?: string;
}

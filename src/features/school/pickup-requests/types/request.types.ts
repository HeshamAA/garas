export type RequestStatus = 'pending' | 'approved' | 'rejected' | 'completed' | 'delivered';

export type HowToReceive = 'person' | 'car' | 'other';

export interface Student {
  id: number;
  fullName: string;
  class: string;
  code: string;
  parent:Parent
}

export interface Parent {
  id: number;
  fullName: string;
  profileImage: string;
}

export interface School {
  id: number;
  name: string;
  logo: string;
  stage: string;
}

export interface DeliveryPerson {
  id: number;
  fullName: string;
  profileImage: string;
  user: {
    id: number;
    email: string;
    phoneNumber: string;
  };
}

export interface PickupRequest {
  id: number;
  date: string;
  deliveryPerson: DeliveryPerson | null;
  howToReceive: HowToReceive;
  location: string;
  numberOfCar: string | null;
  status: RequestStatus;
  student: Student;
  parent: Parent;
  school: School;
}

export interface data{
  items:PickupRequest[]
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
export interface RequestFilters {
  status?: RequestStatus | 'all';
  searchQuery?: string;
  dateFrom?: Date;
  dateTo?: Date;
}


export interface UpdateRequestStatusPayload {
  id: string;
  status: RequestStatus;
  reason?: string;
}

export interface RequestsApiResponse {
  data: PickupRequest[];
  success: boolean;
  message?: string;
}

export interface SchoolRequestsApiResponse {
  data: data;
  success: boolean;
  message?: string;
}

export interface RequestApiResponse {
  data: PickupRequest;
  success: boolean;
  message?: string;
}
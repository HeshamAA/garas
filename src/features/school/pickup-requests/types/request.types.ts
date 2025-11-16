export type RequestStatus = 'pending' | 'approved' | 'rejected' | 'completed';

export type RequestType = 'proposed' | 'current' | 'completed';

export interface PickupRequest {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  status: RequestStatus;
  location: string;
  receiverId: string;
  receiverName: string;
  parentId: string;
  parentName: string;
  requestDate: Date;
  pickupTime?: Date;
  requestNumber: string;
  type: RequestType;
}

export interface SchoolRequest extends PickupRequest {
  schoolName: string;
  schoolLocation: string;
  transportType: string;
}

export interface RequestFilters {
  status?: RequestStatus | 'all';
  type?: RequestType | 'all';
  searchQuery?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface CreateRequestPayload {
  studentId: string;
  receiverId: string;
  location: string;
  pickupTime?: Date;
  transportType?: string;
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
  data: SchoolRequest[];
  success: boolean;
  message?: string;
}

export interface RequestApiResponse {
  data: PickupRequest;
  success: boolean;
  message?: string;
}

export interface Receiver {
  id: string;
  name: string;
  guardian: string;
  status: 'active' | 'inactive';
  phone: string;
  nationalId: string;
  relationship: string;
  studentIds: string[];
  students: string[];
  vehicleIds: string[];
  vehicles: string[];
  pickupRequests: number;
}

export interface TrustedReceiver {
  id: string;
  name: string;
  guardian: string;
  status: 'active' | 'inactive';
  receiver: string;
  avatar?: string;
}

export interface ReceiverFilters {
  status?: 'active' | 'inactive' | 'all';
  searchQuery?: string;
}

export interface TrustedReceiverFilters {
  type?: 'all' | 'student' | 'guardian' | 'receiver';
  searchQuery?: string;
}

export interface ReceiversState {
  receivers: {
    items: Receiver[];
    filters: ReceiverFilters;
    selectedReceiver: Receiver | null;
    isLoading: boolean;
    error: string | null;
    lastFetched: number | null;
  };
  trustedReceivers: {
    items: TrustedReceiver[];
    filters: TrustedReceiverFilters;
    selectedTrustedReceiver: TrustedReceiver | null;
    isLoading: boolean;
    error: string | null;
    lastFetched: number | null;
  };
  isUpdating: boolean;
  isCreating: boolean;
  isDeleting: boolean;
}

export interface CreateReceiverData {
  name: string;
  guardianId: string;
  phone: string;
  nationalId: string;
  relationship: string;
  studentIds: string[];
  vehicleIds: string[];
}

export interface UpdateReceiverData extends Partial<CreateReceiverData> {
  id: string;
}

export interface ReceiverStatusUpdate {
  id: string;
  status: 'active' | 'inactive';
}
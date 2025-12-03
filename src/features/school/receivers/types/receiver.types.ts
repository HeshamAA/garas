
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

export interface data{
    items:Receiver[]
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
export interface ReceiverFilters {
  status?: 'active' | 'inactive' | 'all';
  searchQuery?: string;
}

export interface ReceiverStatusUpdate {
  id: string;
  status: 'active' | 'inactive';
}

export interface ReceiversApiResponse extends data{
    
}
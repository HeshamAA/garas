export enum RequestStatusEnum {
  PENDING = 'pending',
  APPROVED = 'approved',
  FAST_REQUEST = 'fast_request',
  DELIVERED = 'deliverd',
  CANCELLED = 'canceld',
  WAITING_OUTSIDE = 'waiting_outside',
}

export interface RequestStatusInfo {
  label: string;
  color: string;
  bgColor: string;
  textColor: string;
  icon?: string;
}

export const REQUEST_STATUS_MAP: Record<RequestStatusEnum, RequestStatusInfo> = {
  [RequestStatusEnum.PENDING]: {
    label: 'قيد الانتظار',
    color: 'warning',
    bgColor: 'bg-yellow-500/10',
    textColor: 'text-yellow-700',
    icon: '⏳',
  },
  [RequestStatusEnum.APPROVED]: {
    label: 'تمت الموافقة',
    color: 'success',
    bgColor: 'bg-emerald-500/10',
    textColor: 'text-emerald-700',
    icon: '✓',
  },
  [RequestStatusEnum.FAST_REQUEST]: {
    label: 'طلب سريع',
    color: 'info',
    bgColor: 'bg-purple-500/10',
    textColor: 'text-purple-700',
    icon: '⚡',
  },
  [RequestStatusEnum.DELIVERED]: {
    label: 'تم التسليم',
    color: 'success',
    bgColor: 'bg-green-500/10',
    textColor: 'text-green-700',
    icon: '✅',
  },
  [RequestStatusEnum.CANCELLED]: {
    label: 'مرفوض',
    color: 'destructive',
    bgColor: 'bg-red-500/10',
    textColor: 'text-red-700',
    icon: '❌',
  },
  [RequestStatusEnum.WAITING_OUTSIDE]: {
    label: 'بانتظار الاستلام',
    color: 'info',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-700',
    icon: '🚗',
  },
};

export const getRequestStatusInfo = (status: string): RequestStatusInfo => {
  const statusEnum = status as RequestStatusEnum;
  return REQUEST_STATUS_MAP[statusEnum] || {
    label: 'غير معروف',
    color: 'default',
    bgColor: 'bg-gray-500/10',
    textColor: 'text-gray-700',
    icon: '❓',
  };
};

export const getRequestStatusLabel = (status: string): string => {
  return getRequestStatusInfo(status).label;
};

export const getRequestStatusColor = (status: string): string => {
  return getRequestStatusInfo(status).color;
};

export const canEditRequest = (status: string): boolean => {
  return status === RequestStatusEnum.PENDING;
};

export const canCancelRequest = (status: string): boolean => {
  return status === RequestStatusEnum.PENDING || status === RequestStatusEnum.WAITING_OUTSIDE;
};

export const canConfirmDelivery = (status: string): boolean => {
  return status === RequestStatusEnum.WAITING_OUTSIDE;
};

export const getAllRequestStatuses = (): RequestStatusEnum[] => {
  return Object.values(RequestStatusEnum);
};

export const getFilterableStatuses = () => {
  return [
    { value: 'all', label: 'الكل' },
    { value: RequestStatusEnum.PENDING, label: REQUEST_STATUS_MAP[RequestStatusEnum.PENDING].label },
    { value: RequestStatusEnum.APPROVED, label: REQUEST_STATUS_MAP[RequestStatusEnum.APPROVED].label },
    { value: RequestStatusEnum.FAST_REQUEST, label: REQUEST_STATUS_MAP[RequestStatusEnum.FAST_REQUEST].label },
    { value: RequestStatusEnum.WAITING_OUTSIDE, label: REQUEST_STATUS_MAP[RequestStatusEnum.WAITING_OUTSIDE].label },
    { value: RequestStatusEnum.DELIVERED, label: REQUEST_STATUS_MAP[RequestStatusEnum.DELIVERED].label },
    { value: RequestStatusEnum.CANCELLED, label: REQUEST_STATUS_MAP[RequestStatusEnum.CANCELLED].label },
  ];
};

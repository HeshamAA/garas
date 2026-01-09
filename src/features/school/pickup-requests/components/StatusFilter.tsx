import { Button } from '@/components/ui/button';
import { RequestStatusEnum, REQUEST_STATUS_MAP } from '@/shared/types';

type StatusFilterType = RequestStatusEnum | 'all';

interface StatusFilterProps {
  selectedStatus: StatusFilterType;
  onStatusChange: (status: StatusFilterType) => void;
}

export const StatusFilter = ({ selectedStatus, onStatusChange }: StatusFilterProps) => {
  const statuses: { value: StatusFilterType; label: string }[] = [
    { value: 'all', label: 'الكل' },
    { value: RequestStatusEnum.PENDING, label: REQUEST_STATUS_MAP[RequestStatusEnum.PENDING].label },
    { value: RequestStatusEnum.APPROVED, label: REQUEST_STATUS_MAP[RequestStatusEnum.APPROVED].label },
    { value: RequestStatusEnum.FAST_REQUEST, label: REQUEST_STATUS_MAP[RequestStatusEnum.FAST_REQUEST].label },
    { value: RequestStatusEnum.WAITING_OUTSIDE, label: REQUEST_STATUS_MAP[RequestStatusEnum.WAITING_OUTSIDE].label },
    { value: RequestStatusEnum.DELIVERED, label: REQUEST_STATUS_MAP[RequestStatusEnum.DELIVERED].label },
    { value: RequestStatusEnum.CANCELLED, label: REQUEST_STATUS_MAP[RequestStatusEnum.CANCELLED].label },
  ];

  return (
    <div className="flex gap-2 flex-wrap">
      {statuses.map((status) => {
        const isActive = selectedStatus === status.value;
        
        return (
          <Button
            key={status.value}
            variant={isActive ? 'default' : 'outline'}
            size="sm"
            onClick={() => onStatusChange(status.value)}
          >
            {status.label}
          </Button>
        );
      })}
    </div>
  );
};

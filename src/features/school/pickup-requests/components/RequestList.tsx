import { PickupRequest, SchoolRequest } from '../types/request.types';
import RequestCard from './RequestCard';

interface RequestListProps {
  requests: (PickupRequest | SchoolRequest)[];
  variant?: 'user' | 'school';
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onComplete?: (id: string) => void;
  onCancel?: (id: string) => void;
  onConfirm?: (id: string) => void;
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
}

const RequestList = ({
  requests,
  variant = 'user',
  onApprove,
  onReject,
  onComplete,
  onCancel,
  onConfirm,
  isLoading = false,
  emptyMessage = 'لا توجد طلبات',
  className = '',
}: RequestListProps) => {
  if (requests.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {requests.map((request) => (
        <RequestCard
          key={request.id}
          request={request}
          variant={variant}
          onApprove={onApprove}
          onReject={onReject}
          onComplete={onComplete}
          onCancel={onCancel}
          onConfirm={onConfirm}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

export default RequestList;
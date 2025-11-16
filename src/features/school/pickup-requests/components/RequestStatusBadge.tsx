import { Badge } from '@/components/ui/badge';
import { RequestStatus } from '../types/request.types';

interface RequestStatusBadgeProps {
  status: RequestStatus;
  className?: string;
}

const STATUS_CONFIG: Record<
  RequestStatus,
  { label: string; className: string }
> = {
  pending: {
    label: 'قيد الانتظار',
    className: 'bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20',
  },
  approved: {
    label: 'موافق عليه',
    className: 'bg-success text-success-foreground',
  },
  rejected: {
    label: 'مرفوض',
    className: 'bg-destructive text-destructive-foreground',
  },
  completed: {
    label: 'تم التسليم',
    className: 'bg-success text-success-foreground',
  },
};

const RequestStatusBadge = ({ status, className = '' }: RequestStatusBadgeProps) => {
  const config = STATUS_CONFIG[status];

  if (!config) {
    return null;
  }

  return (
    <Badge className={`${config.className} px-6 py-2 text-sm rounded-full ${className}`}>
      {config.label}
    </Badge>
  );
};

export default RequestStatusBadge;
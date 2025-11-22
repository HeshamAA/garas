import { Badge } from '@/components/ui/badge';
import { getRequestStatusInfo } from '@/shared/types';
import { memo } from 'react';

interface RequestStatusBadgeProps {
  status: string;
  className?: string;
  showIcon?: boolean;
}

const RequestStatusBadge = memo(({ status, className = '', showIcon = true }: RequestStatusBadgeProps) => {
  const statusInfo = getRequestStatusInfo(status);

  return (
    <Badge 
      className={`${statusInfo.bgColor} ${statusInfo.textColor} hover:opacity-80 px-4 py-2 text-sm rounded-full font-medium ${className}`}
    >
      {showIcon && statusInfo.icon && <span className="mr-1">{statusInfo.icon}</span>}
      {statusInfo.label}
    </Badge>
  );
});

RequestStatusBadge.displayName = 'RequestStatusBadge';

export default RequestStatusBadge;
import { Badge } from '@/components/ui/badge';
import { getRequestStatusInfo } from '@/shared/types';

interface StatusBadgeProps {
  status: string;
  showIcon?: boolean;
}

export const StatusBadge = ({ status, showIcon = false }: StatusBadgeProps) => {
  const statusInfo = getRequestStatusInfo(status);

  return (
    <Badge 
      variant="outline" 
      className={`${statusInfo.bgColor} ${statusInfo.textColor} border-transparent`}
    >
      {showIcon && statusInfo.icon && <span className="ml-1">{statusInfo.icon}</span>}
      {statusInfo.label}
    </Badge>
  );
};

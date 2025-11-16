import { Badge } from '@/components/ui/badge';
import { StatusBadgeProps, EntityStatus } from '@/shared/types';

const STATUS_CONFIG: Record<
  EntityStatus,
  { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }
> = {
  active: {
    label: 'نشط',
    variant: 'default',
  },
  inactive: {
    label: 'غير نشط',
    variant: 'secondary',
  },
  pending: {
    label: 'قيد الانتظار',
    variant: 'outline',
  },
  approved: {
    label: 'موافق عليه',
    variant: 'default',
  },
  rejected: {
    label: 'مرفوض',
    variant: 'destructive',
  },
};

const StatusBadge = ({ status, label, className = '' }: StatusBadgeProps) => {
  const config = STATUS_CONFIG[status];

  if (!config) {
    return null;
  }

  return (
    <Badge variant={config.variant} className={className}>
      {label || config.label}
    </Badge>
  );
};

export default StatusBadge;
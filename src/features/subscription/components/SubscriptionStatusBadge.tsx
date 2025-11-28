import { Badge } from '@/components/ui/badge';
import { SubscriptionStatus } from '../types/subscription.types';

interface SubscriptionStatusBadgeProps {
  status: SubscriptionStatus | string;
}

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  active: { label: 'نشط', className: 'bg-green-500/15 text-green-700 hover:bg-green-500/20' },
  expired: { label: 'منتهي', className: 'bg-gray-500/15 text-gray-700 hover:bg-gray-500/20' },
  cancelled: { label: 'ملغي', className: 'bg-red-500/15 text-red-700 hover:bg-red-500/20' },
  pending: { label: 'معلق', className: 'bg-yellow-500/15 text-yellow-800 hover:bg-yellow-500/20' },
};

export const SubscriptionStatusBadge = ({ status }: SubscriptionStatusBadgeProps) => {
  const normalized = status?.toLowerCase?.() ?? 'unknown';
  const config = STATUS_CONFIG[normalized] ?? {
    label: status ?? 'غير معروف',
    className: 'bg-secondary text-secondary-foreground',
  };

  return <Badge className={config.className}>{config.label}</Badge>;
};


import { Badge } from '@/components/ui/badge';
import type { PickupRequest } from '@/features/school/pickup-requests/types/request.types';
import { StatusBadge } from './StatusBadge';
import { formatTime } from '../utils/formatters';

interface RecentRequestItemProps {
  request: PickupRequest;
}

export const RecentRequestItem = ({ request }: RecentRequestItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors">
      <div className="text-right">
        <p className="font-medium">{request.student?.fullName || 'غير محدد'}</p>
        <p className="text-sm text-muted-foreground">
          ولي الأمر: {request.parent?.fullName || request.student?.parent?.fullName || 'غير محدد'}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Badge variant="outline" className="text-xs bg-orange-100 text-orange-700 border-orange-300">
          التكرار: {request.reminderCount ?? 0}
        </Badge>
        <span className="text-sm text-muted-foreground">{formatTime(request.date)}</span>
        <StatusBadge status={request.status} />
      </div>
    </div>
  );
};

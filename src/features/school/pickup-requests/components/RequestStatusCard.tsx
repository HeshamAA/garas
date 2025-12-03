import { Card } from '@/components/ui/card';
import RequestStatusBadge from './RequestStatusBadge';
import type { RequestStatus } from '../types/request.types';

interface RequestStatusCardProps {
  status: RequestStatus;
}

export const RequestStatusCard = ({
  status,

}: RequestStatusCardProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">حالة الطلب</h2>
        <RequestStatusBadge status={status} showIcon />
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
      </div>
    </Card>
  );
};

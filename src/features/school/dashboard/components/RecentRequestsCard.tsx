import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { EmptyState } from '@/shared/components/EmptyState';
import type { PickupRequest } from '@/features/school/pickup-requests/types/request.types';
import { RecentRequestItem } from './RecentRequestItem';

interface RecentRequestsCardProps {
  requests: PickupRequest[];
  loading: boolean;
}

export const RecentRequestsCard = ({ requests, loading }: RecentRequestsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-right">طلبات الاستلام السريعة</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : requests.length > 0 ? (
          <div className="space-y-3">
            {requests.map((request) => (
              <RecentRequestItem key={request.id} request={request} />
            ))}
          </div>
        ) : (
          <EmptyState
            message="لا توجد طلبات استلام سريعة"
            description="لم يتم تسجيل أي طلبات استلام سريعة حتى الآن."
          />
        )}
      </CardContent>
    </Card>
  );
};

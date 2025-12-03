import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { SubscriptionDetail } from '../types/subscription.types';
import { SubscriptionStatusBadge } from './SubscriptionStatusBadge';

interface SubscriptionsTableProps {
  subscriptions: SubscriptionDetail[];
  isLoading: boolean;
  onCancelClick: (id: number) => void;
}

export const SubscriptionsTable = ({ subscriptions, isLoading, onCancelClick }: SubscriptionsTableProps) => {
  if (isLoading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">المدرسة</TableHead>
            <TableHead className="text-right">الخطة</TableHead>
            <TableHead className="text-right">الفترة</TableHead>
            <TableHead className="text-right">المبلغ</TableHead>
            <TableHead className="text-right">الحالة</TableHead>
            <TableHead className="text-right">إجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={6} className="text-center py-10">
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>جاري تحميل البيانات...</span>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  if (subscriptions.length === 0) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">المدرسة</TableHead>
            <TableHead className="text-right">الخطة</TableHead>
            <TableHead className="text-right">الفترة</TableHead>
            <TableHead className="text-right">المبلغ</TableHead>
            <TableHead className="text-right">الحالة</TableHead>
            <TableHead className="text-right">إجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
              لا توجد اشتراكات مطابقة للبحث الحالي
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">المدرسة</TableHead>
          <TableHead className="text-right">الخطة</TableHead>
          <TableHead className="text-right">الفترة</TableHead>
          <TableHead className="text-right">المبلغ</TableHead>
          <TableHead className="text-right">الحالة</TableHead>
          <TableHead className="text-right">إجراءات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subscriptions.map((subscription) => (
          <TableRow key={subscription.id}>
            <TableCell>{subscription.schoolName}</TableCell>
            <TableCell>{subscription.plan.name}</TableCell>
            <TableCell>
              <div className="flex flex-col">
                <span>من: {new Date(subscription.startDate).toLocaleDateString('ar-SA')}</span>
                <span>إلى: {new Date(subscription.endDate).toLocaleDateString('ar-SA')}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <span>{Number(subscription.paidAmount ?? 0).toFixed(2)} ر.س</span>
                <span className="text-xs text-muted-foreground">{subscription.paymentMethod}</span>
              </div>
            </TableCell>
            <TableCell>
              <SubscriptionStatusBadge status={subscription.status} />
            </TableCell>
            <TableCell>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onCancelClick(subscription.id)}
                disabled={subscription.status === 'cancelled'}
              >
                إلغاء
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

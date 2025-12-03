import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import { SubscriptionDetail } from '../types/subscription.types';

interface SubscriptionDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscription: SubscriptionDetail | null;
}

export const SubscriptionDetailDialog = ({ open, onOpenChange, subscription }: SubscriptionDetailDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>تفاصيل الاشتراك</DialogTitle>
        </DialogHeader>

        {!subscription ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">المدرسة</p>
                <p className="font-semibold">{subscription.schoolName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">الخطة</p>
                <p className="font-semibold">{subscription.planName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">تاريخ البداية</p>
                <p>{new Date(subscription.startDate).toLocaleString('ar-SA')}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">تاريخ النهاية</p>
                <p>{new Date(subscription.endDate).toLocaleString('ar-SA')}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">طريقة الدفع</p>
                <p>{subscription.paymentMethod}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">المبلغ المدفوع</p>
                <p>{subscription.paidAmount.toFixed(2)} ر.س</p>
              </div>
            </div>

            {subscription.plan && (
              <div className="space-y-3">
                <h4 className="font-semibold">تفاصيل الخطة</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-lg border p-3">
                    <p className="text-sm text-muted-foreground">السعر</p>
                    <p className="font-semibold">{Number(subscription.plan.price ?? 0).toFixed(2)} ر.س</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-sm text-muted-foreground">مدة الاشتراك (يوم)</p>
                    <p className="font-semibold">{subscription.plan.duration}</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-sm text-muted-foreground">الطلاب المسموحين</p>
                    <p className="font-semibold">{subscription.plan.maxStudents ?? '-'}</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-sm text-muted-foreground">المستلمون المسموحون</p>
                    <p className="font-semibold">{subscription.plan.maxDeliveryPersons ?? '-'}</p>
                  </div>
                </div>
                {subscription.plan.features?.length ? (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">المميزات</p>
                    <ul className="list-disc pr-5 space-y-1 text-sm">
                      {subscription.plan.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            )}

            {subscription.cancellationReason && (
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                <p className="font-semibold text-yellow-800">سبب الإلغاء</p>
                <p className="text-sm text-yellow-800 mt-2">{subscription.cancellationReason}</p>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

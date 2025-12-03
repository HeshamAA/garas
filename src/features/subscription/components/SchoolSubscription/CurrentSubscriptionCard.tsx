import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, CreditCard } from 'lucide-react';
import { SubscriptionDetail } from '../../types/subscription.types';
import { SubscriptionStatusBadge } from '../SubscriptionStatusBadge';

interface CurrentSubscriptionCardProps {
  subscription: SubscriptionDetail | null;
  isLoading: boolean;
  subscriptionEndsIn: string | null;
  onCancel: () => void;
}

export const CurrentSubscriptionCard = ({
  subscription,
  isLoading,
  subscriptionEndsIn,
  onCancel,
}: CurrentSubscriptionCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-2">
        <CardTitle>الاشتراك الحالي</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : !subscription ? (
          <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
            <CreditCard className="w-10 h-10 text-muted-foreground" />
            <p className="text-muted-foreground">لا يوجد اشتراك نشط حالياً، اختر إحدى الخطط للبدء.</p>
          </div>
        ) : (
          <div className="space-y-4 rounded-xl border p-5">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-xl font-semibold">{subscription.planName}</h3>
              <SubscriptionStatusBadge status={subscription.status} />
              {subscriptionEndsIn && <Badge variant="secondary">{subscriptionEndsIn}</Badge>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg bg-primary/5 p-4">
                <p className="text-sm text-muted-foreground">تاريخ البداية</p>
                <p className="text-lg font-semibold">{new Date(subscription.startDate).toLocaleDateString('ar-SA')}</p>
              </div>
              <div className="rounded-lg bg-primary/5 p-4">
                <p className="text-sm text-muted-foreground">تاريخ الانتهاء</p>
                <p className="text-lg font-semibold">{new Date(subscription.endDate).toLocaleDateString('ar-SA')}</p>
              </div>
              <div className="rounded-lg bg-secondary p-4">
                <p className="text-sm text-muted-foreground">المبلغ المدفوع</p>
                <p className="text-lg font-semibold">{Number(subscription.paidAmount ?? 0).toFixed(2)} ر.س</p>
              </div>
              <div className="rounded-lg bg-secondary p-4">
                <p className="text-sm text-muted-foreground">طريقة الدفع</p>
                <p className="text-lg font-semibold">{subscription.paymentMethod}</p>
              </div>
            </div>

            {subscription.plan?.features?.length ? (
              <div>
                <p className="text-sm font-semibold mb-2">مميزات الخطة:</p>
                <ul className="list-disc pr-5 space-y-1 text-sm">
                  {subscription.plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div className="flex flex-col gap-2 pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                إلغاء الاشتراك سيؤدي إلى تسجيل خروجك ولن تتمكن من الدخول مرة أخرى إلا بعد الاشتراك في خطة جديدة.
              </p>
              <Button variant="destructive" className="w-full sm:w-auto" onClick={onCancel}>
                إلغاء الاشتراك
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

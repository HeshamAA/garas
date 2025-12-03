import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SubscriptionPlan } from '../../types/subscription.types';

interface AvailablePlanCardProps {
  plan: SubscriptionPlan;
  onSubscribe: (plan: SubscriptionPlan) => void;
}

export const AvailablePlanCard = ({ plan, onSubscribe }: AvailablePlanCardProps) => {
  return (
    <Card className={`border-2 ${plan.isActive ? 'border-primary/30' : 'border-border'}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{plan.name}</CardTitle>
          <Badge className={plan.isActive ? 'bg-green-500/15 text-green-700' : 'bg-gray-500/15 text-gray-700'}>
            {plan.isActive ? 'نشطة' : 'غير نشطة'}
          </Badge>
        </div>
        {plan.description && <p className="text-sm text-muted-foreground">{plan.description}</p>}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-3xl font-bold text-primary">
          {Number(plan.price ?? 0).toFixed(2)}{' '}
          <span className="text-base font-normal text-muted-foreground">ر.س / {plan.duration} يوم</span>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="p-3 rounded-lg bg-primary/5">
            <p className="text-muted-foreground">عدد الطلاب</p>
            <p className="font-semibold">{plan.maxStudents}</p>
          </div>
          <div className="p-3 rounded-lg bg-primary/5">
            <p className="text-muted-foreground">عدد المستلمين</p>
            <p className="font-semibold">{plan.maxDeliveryPersons}</p>
          </div>
        </div>
        {plan.features?.length ? (
          <ul className="list-disc pr-5 space-y-1 text-sm">
            {plan.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">لا توجد مميزات مفصلة</p>
        )}
        <Button className="w-full" disabled={!plan.isActive} onClick={() => onSubscribe(plan)}>
          اشترك الآن
        </Button>
      </CardContent>
    </Card>
  );
};

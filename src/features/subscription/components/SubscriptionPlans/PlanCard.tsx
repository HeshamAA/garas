import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { SubscriptionPlan } from '../../types/subscription.types';

interface PlanCardProps {
  plan: SubscriptionPlan;
  onView: (plan: SubscriptionPlan) => void;
  onEdit: (plan: SubscriptionPlan) => void;
  onDelete: (id: number) => void;
}

export const PlanCard = ({ plan, onView, onEdit, onDelete }: PlanCardProps) => {
  return (
    <Card className="border-primary/20">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{plan.name}</CardTitle>
          <Badge className={plan.isActive ? 'bg-green-500/15 text-green-700' : 'bg-gray-500/15 text-gray-700'}>
            {plan.isActive ? 'نشطة' : 'متوقفة'}
          </Badge>
        </div>
        {plan.description && <p className="text-sm text-muted-foreground">{plan.description}</p>}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-3xl font-bold">
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
          <p className="text-sm text-muted-foreground">لا توجد مميزات مسجلة</p>
        )}
        <div className="flex flex-wrap gap-2 pt-4 border-t">
          <Button variant="outline" size="sm" className="flex-1" onClick={() => onView(plan)}>
            <Eye className="w-4 h-4 ml-2" />
            عرض
          </Button>
          <Button variant="secondary" size="sm" className="flex-1" onClick={() => onEdit(plan)}>
            <Pencil className="w-4 h-4 ml-2" />
            تعديل
          </Button>
          <Button variant="destructive" size="sm" className="flex-1" onClick={() => onDelete(plan.id)}>
            <Trash2 className="w-4 h-4 ml-2" />
            حذف
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

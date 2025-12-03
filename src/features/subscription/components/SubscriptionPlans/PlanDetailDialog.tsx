import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Loader2, Check } from 'lucide-react';
import { SubscriptionPlan } from '../../types/subscription.types';

interface PlanDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: SubscriptionPlan | null;
  loading: boolean;
}

export const PlanDetailDialog = ({ open, onOpenChange, plan, loading }: PlanDetailDialogProps) => {
  if (!plan) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-2xl">تفاصيل الخطة</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-muted-foreground mt-1">{plan.description}</p>
              </div>
              <Badge variant={plan.isActive ? 'default' : 'secondary'}>
                {plan.isActive ? 'نشطة' : 'غير نشطة'}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">السعر</p>
                <p className="text-2xl font-bold text-primary">{plan.price} ر.س</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">المدة</p>
                <p className="text-lg font-semibold">{plan.duration} يوم</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">الحد الأقصى للطلاب</p>
                <p className="text-lg font-semibold">{plan.maxStudents}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">الحد الأقصى للمستلمين</p>
                <p className="text-lg font-semibold">{plan.maxDeliveryPersons}</p>
              </div>
            </div>

            {plan.features && plan.features.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold">المميزات</h4>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {plan.createdAt && (
              <div className="pt-4 border-t text-sm text-muted-foreground">
                <p>تاريخ الإنشاء: {new Date(plan.createdAt).toLocaleDateString('ar-SA')}</p>
                {plan.updatedAt && (
                  <p className="mt-1">آخر تحديث: {new Date(plan.updatedAt).toLocaleDateString('ar-SA')}</p>
                )}
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

import { DashboardLayout } from '@/shared/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Loader2, AlertTriangle } from 'lucide-react';
import { PaymentMethod } from '../types/subscription.types';
import { Pagination } from '@/shared/components/ui';
import { useSchoolSubscription } from '../hooks/useSchoolSubscription';
import { CurrentSubscriptionCard, AvailablePlanCard } from '../components/SchoolSubscription';
import { PAYMENT_METHODS } from '../types/payment.types';

export const SchoolSubscriptionPage = () => {
  const {
    currentSubscription,
    plans,
    planFilters,
    plansPagination,
    selectedPlan,
    setSelectedPlan,
    paymentMethod,
    setPaymentMethod,
    isDialogOpen,
    setIsDialogOpen,
    isLoading,
    cancelDialogOpen,
    setCancelDialogOpen,
    isCancelling,
    subscriptionEndsIn,
    handlePlanFilterChange,
    handleSubscribe,
    handleCancelSubscription,
  } = useSchoolSubscription();

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6" dir="rtl">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">اشتراك المدرسة</h1>
          <p className="text-muted-foreground">تابع حالة اشتراكك الحالية واختر الخطة المناسبة عند الحاجة</p>
        </div>

        {!isLoading.subscription && !currentSubscription && (
          <div className="p-4 border border-yellow-300/60 bg-yellow-50 text-sm rounded-lg flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <p>
              يجب اختيار خطة اشتراك قبل استخدام منصة المدرسة. اختر إحدى الخطط المتاحة بالأسفل لتتمكن من الوصول إلى باقي الصفحات.
            </p>
          </div>
        )}

        <CurrentSubscriptionCard
          subscription={currentSubscription}
          isLoading={isLoading.subscription}
          subscriptionEndsIn={subscriptionEndsIn}
          onCancel={() => setCancelDialogOpen(true)}
        />

        <Card>
          <CardHeader className="flex flex-col gap-3">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <CardTitle>الخطط المتاحة للمدرسة</CardTitle>
              <Select
                value={planFilters.isActive === undefined ? 'all' : String(planFilters.isActive)}
                onValueChange={(value) =>
                  handlePlanFilterChange('isActive', value === 'all' ? undefined : (value === 'true'))
                }
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="حالة الخطة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">الخطط النشطة فقط</SelectItem>
                  <SelectItem value="false">الخطط غير النشطة</SelectItem>
                  <SelectItem value="all">جميع الخطط</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-muted-foreground text-sm">اختر الخطة المناسبة واضغط على زر الاشتراك لإكمال العملية</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {isLoading.plans ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : plans.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">لا توجد خطط متاحة حالياً</div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {plans.map((plan) => (
                  <AvailablePlanCard
                    key={plan.id}
                    plan={plan}
                    onSubscribe={(plan) => {
                      setSelectedPlan(plan);
                      setIsDialogOpen(true);
                    }}
                  />
                ))}
              </div>
            )}

            {plansPagination && (
              <Pagination
                metadata={plansPagination}
                onPageChange={(page) => handlePlanFilterChange('page', page)}
                isLoading={isLoading.plans}
              />
            )}
          </CardContent>
        </Card>

        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              setSelectedPlan(null);
            }
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>تأكيد الاشتراك</DialogTitle>
              <DialogDescription>
                {selectedPlan
                  ? `سيتم الاشتراك في خطة ${selectedPlan.name} بمبلغ ${Number(selectedPlan.price ?? 0).toFixed(2)} ر.س`
                  : 'اختر خطة للمتابعة'}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3">
              <p className="text-sm font-medium">اختر طريقة الدفع</p>
              <Select value={paymentMethod} onValueChange={(value: PaymentMethod) => setPaymentMethod(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="طريقة الدفع" />
                </SelectTrigger>
                <SelectContent>
                  {PAYMENT_METHODS.map((method) => (
                    <SelectItem key={method.value} value={method.value}>
                      {method.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                تراجع
              </Button>
              <Button onClick={handleSubscribe} disabled={isLoading.subscribe || !selectedPlan}>
                {isLoading.subscribe && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                إتمام الاشتراك
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>إلغاء الاشتراك الحالي</AlertDialogTitle>
              <AlertDialogDescription>
                إلغاء الاشتراك سيؤدي إلى تسجيل خروجك فوراً، وستحتاج للاشتراك في خطة جديدة للعودة إلى المنصة. هل أنت متأكد؟
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="gap-2">
              <AlertDialogCancel disabled={isCancelling}>تراجع</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleCancelSubscription}
                disabled={isCancelling}
                className="bg-destructive hover:bg-destructive/90"
              >
                {isCancelling && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                تأكيد الإلغاء
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
};

export default SchoolSubscriptionPage;


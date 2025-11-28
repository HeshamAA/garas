import { useEffect, useMemo, useState } from 'react';
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
import { Badge } from '@/components/ui/badge';
import { Loader2, CreditCard, AlertTriangle } from 'lucide-react';
import { subscriptionApi } from '../api/subscriptionApi';
import { PaymentMethod, PlanQueryParams, SubscriptionDetail, SubscriptionPlan } from '../types/subscription.types';
import { useToast } from '@/hooks/use-toast';
import { SubscriptionStatusBadge } from '../components/SubscriptionStatusBadge';
import { Pagination } from '@/shared/components/ui';
import { PaginationMetadata } from '@/shared/types/pagination.types';
import { useAppDispatch } from '@/shared/hooks';
import { logoutUser } from '@/features/auth/store/authThunks';
import { useNavigate } from 'react-router-dom';
import { PUBLIC_ROUTES, SCHOOL_ROUTES } from '@/shared/constants/routes';

const PAYMENT_METHODS: { label: string; value: PaymentMethod }[] = [
  { value: 'credit_card', label: 'بطاقة ائتمانية' },
  { value: 'bank_transfer', label: 'حوالة بنكية' },
  { value: 'cash', label: 'دفع نقدي' },
];

export const SchoolSubscriptionPage = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [currentSubscription, setCurrentSubscription] = useState<SubscriptionDetail | null>(null);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [planFilters, setPlanFilters] = useState<PlanQueryParams>({ isActive: true, page: 1, limit: 4, sortOrder: 'ASC' });
  const [plansPagination, setPlansPagination] = useState<PaginationMetadata | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState({ subscription: false, plans: false, subscribe: false });
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const loadCurrentSubscription = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, subscription: true }));
      const subscription = await subscriptionApi.getMySubscription();
      setCurrentSubscription(subscription);
    } catch (error) {
      toast({
        title: 'تعذر تحميل الاشتراك الحالي',
        description: error instanceof Error ? error.message : 'حدث خطأ غير متوقع',
        variant: 'destructive',
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, subscription: false }));
    }
  };

  const loadPlans = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, plans: true }));
      const response = await subscriptionApi.getPlans(planFilters);
      const items = Array.isArray(response.items) ? response.items : [];
      setPlans(items);
      setPlansPagination(response.metadata ?? null);
    } catch (error) {
      toast({
        title: 'تعذر تحميل الخطط المتاحة',
        description: error instanceof Error ? error.message : 'حدث خطأ غير متوقع',
        variant: 'destructive',
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, plans: false }));
    }
  };

  useEffect(() => {
    loadCurrentSubscription();
  }, []);

  useEffect(() => {
    loadPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planFilters]);

  const handlePlanFilterChange = <K extends keyof PlanQueryParams>(key: K, value: PlanQueryParams[K]) => {
    setPlanFilters((prev) => ({
      ...prev,
      [key]: value ?? undefined,
      page: key === 'page' ? value : 1,
    }));
  };

  const handleSubscribe = async () => {
    if (!selectedPlan) return;
    try {
      setIsLoading((prev) => ({ ...prev, subscribe: true }));
      await subscriptionApi.subscribe({
        planId: selectedPlan.id,
        paymentMethod,
      });
      toast({
        title: 'تم الاشتراك بنجاح',
        description: `تم تفعيل خطة ${selectedPlan.name}، يمكنك متابعة تفاصيل الاشتراك من هذه الصفحة.`,
      });
      setIsDialogOpen(false);
      setSelectedPlan(null);
      await loadCurrentSubscription();
      navigate(SCHOOL_ROUTES.DASHBOARD, { replace: true });
    } catch (error) {
      toast({
        title: 'تعذر إتمام الاشتراك',
        description: error instanceof Error ? error.message : 'حدث خطأ أثناء تنفيذ الطلب',
        variant: 'destructive',
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, subscribe: false }));
    }
  };

  const handleCancelSubscription = async () => {
    if (!currentSubscription) return;
    try {
      setIsCancelling(true);
      await subscriptionApi.cancelSubscription(currentSubscription.id);
      toast({
        title: 'تم إلغاء الاشتراك',
        description: 'تم تسجيل خروجك، يمكنك الاشتراك مرة أخرى عند تسجيل الدخول.',
      });
      setCancelDialogOpen(false);
      setCurrentSubscription(null);
      await dispatch(logoutUser());
      navigate(PUBLIC_ROUTES.LOGIN, { replace: true, state: { reason: 'subscriptionCancelled' } });
    } catch (error) {
      toast({
        title: 'تعذر إلغاء الاشتراك',
        description: error instanceof Error ? error.message : 'حدث خطأ أثناء تنفيذ الطلب',
        variant: 'destructive',
      });
    } finally {
      setIsCancelling(false);
    }
  };

  const subscriptionEndsIn = useMemo(() => {
    if (!currentSubscription?.endDate) return null;
    const end = new Date(currentSubscription.endDate).getTime();
    const diff = end - Date.now();
    if (diff <= 0) return 'انتهى الاشتراك';
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return `متبقي ${days} يوم`;
  }, [currentSubscription]);

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

        <Card>
          <CardHeader className="flex flex-col gap-2">
            <CardTitle>الاشتراك الحالي</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading.subscription ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : !currentSubscription ? (
              <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                <CreditCard className="w-10 h-10 text-muted-foreground" />
                <p className="text-muted-foreground">لا يوجد اشتراك نشط حالياً، اختر إحدى الخطط للبدء.</p>
              </div>
            ) : (
              <div className="space-y-4 rounded-xl border p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-semibold">{currentSubscription.planName}</h3>
                  <SubscriptionStatusBadge status={currentSubscription.status} />
                  {subscriptionEndsIn && <Badge variant="secondary">{subscriptionEndsIn}</Badge>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-lg bg-primary/5 p-4">
                    <p className="text-sm text-muted-foreground">تاريخ البداية</p>
                    <p className="text-lg font-semibold">{new Date(currentSubscription.startDate).toLocaleDateString('ar-SA')}</p>
                  </div>
                  <div className="rounded-lg bg-primary/5 p-4">
                    <p className="text-sm text-muted-foreground">تاريخ الانتهاء</p>
                    <p className="text-lg font-semibold">{new Date(currentSubscription.endDate).toLocaleDateString('ar-SA')}</p>
                  </div>
                  <div className="rounded-lg bg-secondary p-4">
                    <p className="text-sm text-muted-foreground">المبلغ المدفوع</p>
                    <p className="text-lg font-semibold">{Number(currentSubscription.paidAmount ?? 0).toFixed(2)} ر.س</p>
                  </div>
                  <div className="rounded-lg bg-secondary p-4">
                    <p className="text-sm text-muted-foreground">طريقة الدفع</p>
                    <p className="text-lg font-semibold">{currentSubscription.paymentMethod}</p>
                  </div>
                </div>

                {currentSubscription.plan?.features?.length ? (
                  <div>
                    <p className="text-sm font-semibold mb-2">مميزات الخطة:</p>
                    <ul className="list-disc pr-5 space-y-1 text-sm">
                      {currentSubscription.plan.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                <div className="flex flex-col gap-2 pt-4 border-t">
                  <p className="text-xs text-muted-foreground">
                    إلغاء الاشتراك سيؤدي إلى تسجيل خروجك ولن تتمكن من الدخول مرة أخرى إلا بعد الاشتراك في خطة جديدة.
                  </p>
                  <Button variant="destructive" className="w-full sm:w-auto" onClick={() => setCancelDialogOpen(true)}>
                    إلغاء الاشتراك
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

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
                  <Card key={plan.id} className={`border-2 ${plan.isActive ? 'border-primary/30' : 'border-border'}`}>
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
                      <Button
                        className="w-full"
                        disabled={!plan.isActive}
                        onClick={() => {
                          setSelectedPlan(plan);
                          setIsDialogOpen(true);
                        }}
                      >
                        اشترك الآن
                      </Button>
                    </CardContent>
                  </Card>
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


import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/shared/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, PlusCircle, Eye, Pencil, Trash2, DollarSign, Calendar, Users, UserCheck } from 'lucide-react';
import { subscriptionApi } from '../api/subscriptionApi';
import { CreatePlanPayload, PlanQueryParams, SubscriptionPlan, UpdatePlanPayload } from '../types/subscription.types';
import { useToast } from '@/hooks/use-toast';
import { Pagination } from '@/shared/components/ui';
import { PaginationMetadata } from '@/shared/types/pagination.types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
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

const defaultPlanPayload: CreatePlanPayload = {
  name: '',
  description: '',
  price: 0,
  duration: 30,
  maxStudents: 0,
  maxDeliveryPersons: 0,
  features: [],
  isActive: true,
};

export const SubscriptionPlansPage = () => {
  const { toast } = useToast();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [planFilters, setPlanFilters] = useState<PlanQueryParams>({ page: 1, limit: 6, sortOrder: 'ASC', isActive: true });
  const [pagination, setPagination] = useState<PaginationMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState<CreatePlanPayload>(defaultPlanPayload);
  const [featuresInput, setFeaturesInput] = useState('');
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [detailPlan, setDetailPlan] = useState<SubscriptionPlan | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editPlanId, setEditPlanId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<UpdatePlanPayload>({});
  const [editFeaturesInput, setEditFeaturesInput] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [deleteState, setDeleteState] = useState<{ id: number | null; loading: boolean }>({ id: null, loading: false });

  const loadPlans = async () => {
    try {
      setIsLoading(true);
      const response = await subscriptionApi.getPlans(planFilters);
      const items = Array.isArray(response.items) ? response.items : [];
      setPlans(items);
      setPagination(response.metadata ?? null);
    } catch (error) {
      toast({
        title: 'تعذر تحميل الخطط',
        description: error instanceof Error ? error.message : 'حدث خطأ غير متوقع',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleInputChange = (key: keyof CreatePlanPayload, value: string | number | boolean) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleEditInputChange = (key: keyof UpdatePlanPayload, value: string | number | boolean) => {
    setEditValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmitPlan = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      const payload: CreatePlanPayload = {
        ...formValues,
        price: Number(formValues.price),
        duration: Number(formValues.duration),
        maxStudents: Number(formValues.maxStudents),
        maxDeliveryPersons: Number(formValues.maxDeliveryPersons),
        features: featuresInput
          .split('\n')
          .map((feature) => feature.trim())
          .filter(Boolean),
      };

      await subscriptionApi.createPlan(payload);
      toast({
        title: 'تم إنشاء الخطة بنجاح',
        description: 'يمكنك الآن ربط المدارس بهذه الخطة.',
      });
      setFormValues(defaultPlanPayload);
      setFeaturesInput('');
      loadPlans();
    } catch (error) {
      toast({
        title: 'تعذر إنشاء الخطة',
        description: error instanceof Error ? error.message : 'حدث خطأ أثناء حفظ البيانات',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenDetail = async (plan: SubscriptionPlan) => {
    setDetailDialogOpen(true);
    setDetailPlan(plan);
    setDetailLoading(true);
    try {
      const freshPlan = await subscriptionApi.getPlanById(plan.id);
      setDetailPlan(freshPlan);
    } catch (error) {
      setDetailDialogOpen(false);
      toast({
        title: 'تعذر تحميل تفاصيل الخطة',
        description: error instanceof Error ? error.message : 'حدث خطأ غير متوقع',
        variant: 'destructive',
      });
    } finally {
      setDetailLoading(false);
    }
  };

  const handleOpenEdit = async (plan: SubscriptionPlan) => {
    setEditDialogOpen(true);
    setEditPlanId(plan.id);
    setIsUpdating(false);
    setDetailLoading(true);

    setEditValues({
      name: plan.name,
      description: plan.description,
      price: plan.price,
      duration: plan.duration,
      maxStudents: plan.maxStudents,
      maxDeliveryPersons: plan.maxDeliveryPersons,
      features: plan.features,
      isActive: plan.isActive,
    });
    setEditFeaturesInput(plan.features?.join('\n') ?? '');

    try {
      const freshPlan = await subscriptionApi.getPlanById(plan.id);
      setEditValues({
        name: freshPlan.name,
        description: freshPlan.description,
        price: freshPlan.price,
        duration: freshPlan.duration,
        maxStudents: freshPlan.maxStudents,
        maxDeliveryPersons: freshPlan.maxDeliveryPersons,
        features: freshPlan.features,
        isActive: freshPlan.isActive,
      });
      setEditFeaturesInput(freshPlan.features?.join('\n') ?? '');
    } catch (error) {
      setEditDialogOpen(false);
      toast({
        title: 'تعذر تحميل بيانات الخطة',
        description: error instanceof Error ? error.message : 'حدث خطأ غير متوقع',
        variant: 'destructive',
      });
    } finally {
      setDetailLoading(false);
    }
  };

  const handleUpdatePlan = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editPlanId) return;
    try {
      setIsUpdating(true);
      const payload: UpdatePlanPayload = {
        ...editValues,
        features: editFeaturesInput
          .split('\n')
          .map((feature) => feature.trim())
          .filter(Boolean),
      };
      await subscriptionApi.updatePlan(editPlanId, payload);
      toast({
        title: 'تم تحديث الخطة',
        description: 'تم حفظ التعديلات بنجاح',
      });
      setEditDialogOpen(false);
      loadPlans();
    } catch (error) {
      toast({
        title: 'تعذر تحديث الخطة',
        description: error instanceof Error ? error.message : 'حدث خطأ أثناء التحديث',
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteState.id) return;
    try {
      setDeleteState((prev) => ({ ...prev, loading: true }));
      const response = await subscriptionApi.deletePlan(deleteState.id);
      toast({
        title: 'تم حذف الخطة',
        description: response.message || 'تم إزالة الخطة بنجاح',
      });
      setDeleteState({ id: null, loading: false });
      loadPlans();
    } catch (error) {
      toast({
        title: 'تعذر حذف الخطة',
        description: error instanceof Error ? error.message : 'حدث خطأ أثناء الحذف',
        variant: 'destructive',
      });
      setDeleteState({ id: null, loading: false });
    }
  };

  const formatCurrency = (value?: number) =>
    Number(value ?? 0).toLocaleString('ar-SA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const formatDate = (value?: string) => (value ? new Date(value).toLocaleString('ar-SA') : 'غير متوفر');

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6" dir="rtl">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">خطط الاشتراك</h1>
          <p className="text-muted-foreground">قم بإدارة الخطط المتاحة للمدارس وحدّث مزايا كل خطة</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 order-2 lg:order-1">
            <CardHeader>
              <CardTitle>الخطط الحالية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">حالة الخطة</label>
                  <Select
                    value={planFilters.isActive === undefined ? 'all' : String(planFilters.isActive)}
                    onValueChange={(value) =>
                      handlePlanFilterChange('isActive', value === 'all' ? undefined : (value === 'true'))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="الكل" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الخطط</SelectItem>
                      <SelectItem value="true">نشطة</SelectItem>
                      <SelectItem value="false">غير نشطة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">عدد النتائج</label>
                  <Select value={(planFilters.limit ?? 6).toString()} onValueChange={(value) => handlePlanFilterChange('limit', Number(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="6" />
                    </SelectTrigger>
                    <SelectContent>
                      {[6, 12, 24].map((limit) => (
                        <SelectItem key={limit} value={limit.toString()}>
                          {limit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : plans.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">لا توجد خطط مطابقة للمرشحات الحالية</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {plans.map((plan) => (
                    <Card key={plan.id} className="border-primary/20">
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
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => handleOpenDetail(plan)}>
                            <Eye className="w-4 h-4 ml-2" />
                            عرض
                          </Button>
                          <Button variant="secondary" size="sm" className="flex-1" onClick={() => handleOpenEdit(plan)}>
                            <Pencil className="w-4 h-4 ml-2" />
                            تعديل
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="flex-1"
                            onClick={() => setDeleteState({ id: plan.id, loading: false })}
                          >
                            <Trash2 className="w-4 h-4 ml-2" />
                            حذف
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {pagination && (
                <Pagination
                  metadata={pagination}
                  onPageChange={(page) => handlePlanFilterChange('page', page)}
                  isLoading={isLoading}
                />
              )}
            </CardContent>
          </Card>

          <Card className="order-1 lg:order-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5" />
                إنشاء خطة جديدة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmitPlan}>
                <div className="space-y-2">
                  <label className="text-sm font-medium">اسم الخطة</label>
                  <Input value={formValues.name} onChange={(event) => handleInputChange('name', event.target.value)} required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">الوصف</label>
                  <Textarea value={formValues.description} onChange={(event) => handleInputChange('description', event.target.value)} rows={3} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">السعر (ر.س)</label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={formValues.price}
                      onChange={(event) => handleInputChange('price', Number(event.target.value))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">مدة الخطة (يوم)</label>
                    <Input
                      type="number"
                      min="1"
                      value={formValues.duration}
                      onChange={(event) => handleInputChange('duration', Number(event.target.value))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">الطلاب المسموحون</label>
                    <Input
                      type="number"
                      min="0"
                      value={formValues.maxStudents}
                      onChange={(event) => handleInputChange('maxStudents', Number(event.target.value))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">المستلمون المسموحون</label>
                    <Input
                      type="number"
                      min="0"
                      value={formValues.maxDeliveryPersons}
                      onChange={(event) => handleInputChange('maxDeliveryPersons', Number(event.target.value))}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">المميزات (سطر لكل ميزة)</label>
                  <Textarea
                    value={featuresInput}
                    onChange={(event) => setFeaturesInput(event.target.value)}
                    rows={4}
                    placeholder="إشعارات غير محدودة
تقارير متقدمة
دعم فني 24/7"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">حالة الخطة</label>
                  <Select value={String(formValues.isActive)} onValueChange={(value) => handleInputChange('isActive', value === 'true')}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">نشطة</SelectItem>
                      <SelectItem value="false">متوقفة حالياً</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  حفظ الخطة
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>تفاصيل الخطة</DialogTitle>
            <DialogDescription>معلومات كاملة حول خطة الاشتراك</DialogDescription>
          </DialogHeader>
          {detailLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : detailPlan ? (
            <div className="space-y-6 text-right">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">معرف الخطة #{detailPlan.id}</p>
                    <h3 className="text-2xl font-bold">{detailPlan.name}</h3>
                  </div>
                  <Badge className={detailPlan.isActive ? 'bg-green-500/15 text-green-700' : 'bg-gray-500/15 text-gray-700'}>
                    {detailPlan.isActive ? 'نشطة' : 'متوقفة'}
                  </Badge>
                </div>
                {detailPlan.description ? (
                  <p className="text-sm text-muted-foreground">{detailPlan.description}</p>
                ) : (
                  <p className="text-sm text-muted-foreground">لا يوجد وصف لهذه الخطة.</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg border p-4 space-y-1">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>السعر</span>
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <p className="text-xl font-semibold">{formatCurrency(detailPlan.price)} ر.س</p>
                  <p className="text-xs text-muted-foreground">لكل {detailPlan.duration} يوم</p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>مدة الخطة</span>
                    <Calendar className="w-4 h-4" />
                  </div>
                  <p className="text-xl font-semibold">{detailPlan.duration} يوم</p>
                  <p className="text-xs text-muted-foreground">تُجدد بعد انتهاء المدة</p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>عدد الطلاب المسموحين</span>
                    <Users className="w-4 h-4" />
                  </div>
                  <p className="text-xl font-semibold">{detailPlan.maxStudents}</p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>عدد المستلمين المسموحين</span>
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <p className="text-xl font-semibold">{detailPlan.maxDeliveryPersons}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">المميزات المتاحة</p>
                {detailPlan.features?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {detailPlan.features.map((feature) => (
                      <Badge key={feature} variant="secondary" className="px-3 py-1">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">لم تتم إضافة مميزات لهذه الخطة بعد.</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="rounded-lg bg-muted/30 p-3">
                  <p className="font-medium">تاريخ الإنشاء</p>
                  <p className="mt-1">{formatDate(detailPlan.createdAt)}</p>
                </div>
                <div className="rounded-lg bg-muted/30 p-3">
                  <p className="font-medium">آخر تحديث</p>
                  <p className="mt-1">{formatDate(detailPlan.updatedAt)}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">لا توجد تفاصيل متاحة</p>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>تعديل الخطة</DialogTitle>
            <DialogDescription>قم بتحديث بيانات خطة الاشتراك</DialogDescription>
          </DialogHeader>
          {detailLoading && !editValues.name ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : (
            <form className="space-y-4 text-right" onSubmit={handleUpdatePlan}>
              <div className="space-y-2">
                <label className="text-sm font-medium">اسم الخطة</label>
                <Input
                  value={editValues.name ?? ''}
                  onChange={(event) => handleEditInputChange('name', event.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">الوصف</label>
                <Textarea
                  value={editValues.description ?? ''}
                  onChange={(event) => handleEditInputChange('description', event.target.value)}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">السعر (ر.س)</label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={editValues.price ?? 0}
                    onChange={(event) => handleEditInputChange('price', Number(event.target.value))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">المدة (يوم)</label>
                  <Input
                    type="number"
                    min="1"
                    value={editValues.duration ?? 30}
                    onChange={(event) => handleEditInputChange('duration', Number(event.target.value))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">عدد الطلاب</label>
                  <Input
                    type="number"
                    min="0"
                    value={editValues.maxStudents ?? 0}
                    onChange={(event) => handleEditInputChange('maxStudents', Number(event.target.value))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">عدد المستلمين</label>
                  <Input
                    type="number"
                    min="0"
                    value={editValues.maxDeliveryPersons ?? 0}
                    onChange={(event) => handleEditInputChange('maxDeliveryPersons', Number(event.target.value))}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">المميزات (سطر لكل ميزة)</label>
                <Textarea
                  value={editFeaturesInput}
                  onChange={(event) => setEditFeaturesInput(event.target.value)}
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">حالة الخطة</label>
                <Select
                  value={String(editValues.isActive ?? true)}
                  onValueChange={(value) => handleEditInputChange('isActive', value === 'true')}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">نشطة</SelectItem>
                    <SelectItem value="false">متوقفة حالياً</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter className="gap-2">
                <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button type="submit" className="gap-2" disabled={isUpdating}>
                  {isUpdating && <Loader2 className="w-4 h-4 animate-spin" />}
                  حفظ التعديلات
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={Boolean(deleteState.id)} onOpenChange={(open) => !open && setDeleteState({ id: null, loading: false })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>حذف الخطة</AlertDialogTitle>
            <AlertDialogDescription>هل أنت متأكد أنك تريد حذف هذه الخطة؟ لا يمكن التراجع عن هذه العملية.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel disabled={deleteState.loading}>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} disabled={deleteState.loading} className="bg-destructive hover:bg-destructive/90">
              {deleteState.loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              تأكيد الحذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default SubscriptionPlansPage;


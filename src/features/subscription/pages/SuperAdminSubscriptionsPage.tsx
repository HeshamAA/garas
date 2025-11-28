import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/shared/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination } from '@/shared/components/ui';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
import { Loader2, Search, SlidersHorizontal, X } from 'lucide-react';
import { subscriptionApi } from '../api/subscriptionApi';
import { SubscriptionDetail, SubscriptionQueryParams, SubscriptionStatus } from '../types/subscription.types';
import { SubscriptionStatusBadge } from '../components/SubscriptionStatusBadge';
import { useToast } from '@/hooks/use-toast';
import { PaginationMetadata } from '@/shared/types/pagination.types';

const STATUS_OPTIONS: { label: string; value: SubscriptionStatus | 'all' }[] = [
  { label: 'جميع الحالات', value: 'all' },
  { label: 'نشط', value: 'active' },
  { label: 'منتهي', value: 'expired' },
  { label: 'ملغي', value: 'cancelled' },
  { label: 'قيد الانتظار', value: 'pending' },
];

export const SuperAdminSubscriptionsPage = () => {
  const { toast } = useToast();
  const [filters, setFilters] = useState<SubscriptionQueryParams>({
    page: 1,
    limit: 10,
    sortOrder: 'ASC',
  });
  const [subscriptions, setSubscriptions] = useState<SubscriptionDetail[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<SubscriptionDetail | null>(null);
  const [pagination, setPagination] = useState<PaginationMetadata | null>(null);
  const [cancelState, setCancelState] = useState<{ id: number | null; loading: boolean }>({ id: null, loading: false });
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<SubscriptionStatus | 'all'>('all');
  const [schoolIdFilter, setSchoolIdFilter] = useState('');
  const [planIdFilter, setPlanIdFilter] = useState('');
  const [sortByFilter, setSortByFilter] = useState('');
  const [sortOrderFilter, setSortOrderFilter] = useState<'ASC' | 'DESC'>('ASC');
  const [limitFilter, setLimitFilter] = useState('10');

  const loadSubscriptions = async (showLoader = true) => {
    try {
      showLoader ? setIsLoading(true) : setIsRefreshing(true);
      const response = await subscriptionApi.getSubscriptions(filters);
      const items = Array.isArray(response.items) ? response.items : [];
      setSubscriptions(items);
      setPagination(response.metadata ?? null);
    } catch (error) {
      toast({
        title: 'خطأ في تحميل الاشتراكات',
        description: error instanceof Error ? error.message : 'تعذر تحميل البيانات، حاول مرة أخرى',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadSubscriptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleFilterChange = <K extends keyof SubscriptionQueryParams>(key: K, value: SubscriptionQueryParams[K]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
      page: key === 'page' ? value : 1,
    }));
  };

  const handleViewDetails = async (id: number) => {
    try {
      setSelectedSubscription(null);
      setDetailDialogOpen(true);
      const response = await subscriptionApi.getSubscriptionById(id);
      setSelectedSubscription(response);
    } catch (error) {
      setDetailDialogOpen(false);
      toast({
        title: 'تعذر تحميل التفاصيل',
        description: error instanceof Error ? error.message : 'حدث خطأ غير متوقع',
        variant: 'destructive',
      });
    }
  };

  const handleCancelSubscription = async () => {
    if (!cancelState.id) return;

    try {
      setCancelState((prev) => ({ ...prev, loading: true }));
      const response = await subscriptionApi.cancelSubscription(cancelState.id);
      toast({
        title: 'تم إلغاء الاشتراك',
        description: response.message || 'تم تحديث حالة الاشتراك',
      });
      setDetailDialogOpen(false);
      setSelectedSubscription(null);
      await loadSubscriptions(false);
    } catch (error) {
      toast({
        title: 'تعذر إلغاء الاشتراك',
        description: error instanceof Error ? error.message : 'حدث خطأ غير متوقع',
        variant: 'destructive',
      });
    } finally {
      setCancelState({ id: null, loading: false });
    }
  };

  const handleRefresh = () => {
    loadSubscriptions(false);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setFilters((prev) => ({
      ...prev,
      keyword: searchQuery || undefined,
      page: 1,
    }));
  };

  const handleApplyFilters = () => {
    setFilters((prev) => ({
      ...prev,
      status: statusFilter === 'all' ? undefined : statusFilter,
      schoolId: schoolIdFilter ? Number(schoolIdFilter) : undefined,
      planId: planIdFilter ? Number(planIdFilter) : undefined,
      sortBy: sortByFilter || undefined,
      sortOrder: sortOrderFilter,
      limit: Number(limitFilter) || prev.limit,
      page: 1,
    }));
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    setStatusFilter('all');
    setSchoolIdFilter('');
    setPlanIdFilter('');
    setSortByFilter('');
    setSortOrderFilter('ASC');
    setLimitFilter('10');
    setFilters((prev) => ({
      ...prev,
      status: undefined,
      schoolId: undefined,
      planId: undefined,
      sortBy: undefined,
      sortOrder: 'ASC',
      limit: 10,
      page: 1,
    }));
  };

  const hasActiveFilters =
    statusFilter !== 'all' ||
    !!schoolIdFilter ||
    !!planIdFilter ||
    !!sortByFilter ||
    sortOrderFilter !== 'ASC' ||
    limitFilter !== '10';

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6" dir="rtl">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">اشتراكات المدارس</h1>
          <p className="text-muted-foreground">متابعة وإدارة جميع الاشتراكات النشطة والمنتهية</p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-3" dir="rtl">
            <form onSubmit={handleSearch} className="relative flex-1">
              <Input
                placeholder="ابحث باسم المدرسة أو رقمها"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full bg-card text-foreground border rounded-full h-12 pr-12 text-right placeholder:text-right"
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2">
                <Search className="w-5 h-5 text-muted-foreground" />
              </button>
            </form>
            <Button
              variant={showFilters ? 'default' : 'outline'}
              onClick={() => setShowFilters((prev) => !prev)}
              className="rounded-full px-6 gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              فلترة
              {hasActiveFilters && (
                <span className="bg-primary-foreground text-primary rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  !
                </span>
              )}
            </Button>
          </div>

          {showFilters && (
            <div className="bg-card border rounded-lg p-6 space-y-4" dir="rtl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">خيارات الفلترة والترتيب</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">الحالة</label>
                  <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as SubscriptionStatus | 'all')}>
                    <SelectTrigger className="text-right">
                      <SelectValue placeholder="كل الحالات" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">رقم المدرسة</label>
                  <Input
                    type="number"
                    placeholder="مثال: 12"
                    value={schoolIdFilter}
                    onChange={(event) => setSchoolIdFilter(event.target.value)}
                    className="text-right"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">رقم الخطة</label>
                  <Input
                    type="number"
                    placeholder="مثال: 3"
                    value={planIdFilter}
                    onChange={(event) => setPlanIdFilter(event.target.value)}
                    className="text-right"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">ترتيب حسب</label>
                  <Input
                    placeholder="مثال: startDate"
                    value={sortByFilter}
                    onChange={(event) => setSortByFilter(event.target.value)}
                    className="text-right"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">نوع الترتيب</label>
                  <Select value={sortOrderFilter} onValueChange={(value: 'ASC' | 'DESC') => setSortOrderFilter(value)}>
                    <SelectTrigger className="text-right">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ASC">تصاعدي</SelectItem>
                      <SelectItem value="DESC">تنازلي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">عدد النتائج</label>
                  <Select value={limitFilter} onValueChange={(value) => setLimitFilter(value)}>
                    <SelectTrigger className="text-right">
                      <SelectValue placeholder="10" />
                    </SelectTrigger>
                    <SelectContent>
                      {['10', '20', '50'].map((limit) => (
                        <SelectItem key={limit} value={limit}>
                          {limit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className="flex-1 rounded-full"
                  disabled={!hasActiveFilters}
                >
                  مسح الفلاتر
                </Button>
                <Button onClick={handleApplyFilters} className="flex-1 rounded-full">
                  تطبيق الفلاتر
                </Button>
              </div>
            </div>
          )}
        </div>

        <Card>
          <CardHeader className="flex items-center justify-between gap-4 flex-wrap">
            <CardTitle>قائمة الاشتراكات</CardTitle>
            <Button variant="outline" className="gap-2" onClick={handleRefresh} disabled={isRefreshing}>
              {isRefreshing && <Loader2 className="w-4 h-4 animate-spin" />}
              تحديث
            </Button>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="rounded-lg border">
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
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-10">
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>جاري تحميل البيانات...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : subscriptions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                        لا توجد اشتراكات مطابقة للبحث الحالي
                      </TableCell>
                    </TableRow>
                  ) : (
                    subscriptions.map((subscription) => (
                      <TableRow key={subscription.id}>
                        <TableCell>{subscription.schoolName}</TableCell>
                        <TableCell>{subscription.planName}</TableCell>
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
                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleViewDetails(subscription.id)}>
                              التفاصيل
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => setCancelState({ id: subscription.id, loading: false })}
                              disabled={subscription.status === 'cancelled'}
                            >
                              إلغاء
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {pagination && (
              <Pagination
                metadata={pagination}
                onPageChange={(page) => handleFilterChange('page', page)}
                isLoading={isLoading || isRefreshing}
              />
            )}
          </CardContent>
        </Card>

        <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>تفاصيل الاشتراك</DialogTitle>
            </DialogHeader>

            {!selectedSubscription ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">المدرسة</p>
                    <p className="font-semibold">{selectedSubscription.schoolName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">الخطة</p>
                    <p className="font-semibold">{selectedSubscription.planName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">تاريخ البداية</p>
                    <p>{new Date(selectedSubscription.startDate).toLocaleString('ar-SA')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">تاريخ النهاية</p>
                    <p>{new Date(selectedSubscription.endDate).toLocaleString('ar-SA')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">طريقة الدفع</p>
                    <p>{selectedSubscription.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">المبلغ المدفوع</p>
                    <p>{selectedSubscription.paidAmount.toFixed(2)} ر.س</p>
                  </div>
                </div>

                {selectedSubscription.plan && (
                  <div className="space-y-3">
                    <h4 className="font-semibold">تفاصيل الخطة</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="rounded-lg border p-3">
                        <p className="text-sm text-muted-foreground">السعر</p>
                        <p className="font-semibold">{Number(selectedSubscription.plan.price ?? 0).toFixed(2)} ر.س</p>
                      </div>
                      <div className="rounded-lg border p-3">
                        <p className="text-sm text-muted-foreground">مدة الاشتراك (يوم)</p>
                        <p className="font-semibold">{selectedSubscription.plan.duration}</p>
                      </div>
                      <div className="rounded-lg border p-3">
                        <p className="text-sm text-muted-foreground">الطلاب المسموحين</p>
                        <p className="font-semibold">{selectedSubscription.plan.maxStudents ?? '-'}</p>
                      </div>
                      <div className="rounded-lg border p-3">
                        <p className="text-sm text-muted-foreground">المستلمون المسموحون</p>
                        <p className="font-semibold">{selectedSubscription.plan.maxDeliveryPersons ?? '-'}</p>
                      </div>
                    </div>
                    {selectedSubscription.plan.features?.length ? (
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">المميزات</p>
                        <ul className="list-disc pr-5 space-y-1 text-sm">
                          {selectedSubscription.plan.features.map((feature) => (
                            <li key={feature}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                )}

                {selectedSubscription.cancellationReason && (
                  <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                    <p className="font-semibold text-yellow-800">سبب الإلغاء</p>
                    <p className="text-sm text-yellow-800 mt-2">{selectedSubscription.cancellationReason}</p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        <AlertDialog open={Boolean(cancelState.id)} onOpenChange={(open) => !open && setCancelState({ id: null, loading: false })}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>تأكيد إلغاء الاشتراك</AlertDialogTitle>
              <AlertDialogDescription>هل أنت متأكد أنك تريد إلغاء هذا الاشتراك؟ لا يمكن التراجع عن هذه العملية.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="gap-2">
              <AlertDialogCancel disabled={cancelState.loading}>تراجع</AlertDialogCancel>
              <AlertDialogAction onClick={handleCancelSubscription} disabled={cancelState.loading} className="bg-destructive hover:bg-destructive/90">
                {cancelState.loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                تأكيد الإلغاء
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminSubscriptionsPage;


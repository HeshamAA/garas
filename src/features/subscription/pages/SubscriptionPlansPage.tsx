import { DashboardLayout } from '@/shared/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, PlusCircle } from 'lucide-react';
import { Pagination } from '@/shared/components/ui';
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
import { useSubscriptionPlans } from '../hooks/useSubscriptionPlans';
import { PlanCard, CreatePlanForm } from '../components/SubscriptionPlans';

export const SubscriptionPlansPage = () => {
  const {
    plans,
    planFilters,
    pagination,
    isLoading,
    isSubmitting,
    formValues,
    featuresInput,
    setFeaturesInput,
    deleteState,
    setDeleteState,
    handlePlanFilterChange,
    handleInputChange,
    handleSubmitPlan,
    handleOpenDetail,
    handleOpenEdit,
    handleConfirmDelete,
  } = useSubscriptionPlans();

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
                    <PlanCard
                      key={plan.id}
                      plan={plan}
                      onView={handleOpenDetail}
                      onEdit={handleOpenEdit}
                      onDelete={(id) => setDeleteState({ id, loading: false })}
                    />
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
              <CreatePlanForm
                formValues={formValues}
                featuresInput={featuresInput}
                isSubmitting={isSubmitting}
                onInputChange={handleInputChange}
                onFeaturesChange={setFeaturesInput}
                onSubmit={handleSubmitPlan}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* TODO: Add detail and edit dialogs as separate components */}

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


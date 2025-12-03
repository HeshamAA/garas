import { DashboardLayout } from '@/shared/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
import { Loader2, Search, SlidersHorizontal } from 'lucide-react';
import { useSuperAdminSubscriptions } from '../hooks/useSuperAdminSubscriptions';
import { SubscriptionsTable, SubscriptionsFilters, SubscriptionDetailDialog } from '../components';

export const SuperAdminSubscriptionsPage = () => {
  const {
    subscriptions,
    isLoading,
    isRefreshing,
    pagination,
    cancelState,
    setCancelState,
    searchQuery,
    setSearchQuery,
    showFilters,
    setShowFilters,
    statusFilter,
    setStatusFilter,
    schoolIdFilter,
    setSchoolIdFilter,
    planIdFilter,
    setPlanIdFilter,
    sortByFilter,
    setSortByFilter,
    sortOrderFilter,
    setSortOrderFilter,
    limitFilter,
    setLimitFilter,
    detailDialogOpen,
    setDetailDialogOpen,
    selectedSubscription,
    hasActiveFilters,
    handleFilterChange,
    handleCancelSubscription,
    handleRefresh,
    handleSearch,
    handleApplyFilters,
    handleClearFilters,
  } = useSuperAdminSubscriptions();
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
            <SubscriptionsFilters
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              schoolIdFilter={schoolIdFilter}
              onSchoolIdChange={setSchoolIdFilter}
              planIdFilter={planIdFilter}
              onPlanIdChange={setPlanIdFilter}
              sortByFilter={sortByFilter}
              onSortByChange={setSortByFilter}
              sortOrderFilter={sortOrderFilter}
              onSortOrderChange={setSortOrderFilter}
              limitFilter={limitFilter}
              onLimitChange={setLimitFilter}
              hasActiveFilters={hasActiveFilters}
              onApply={handleApplyFilters}
              onClear={handleClearFilters}
              onClose={() => setShowFilters(false)}
            />
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
              <SubscriptionsTable
                subscriptions={subscriptions}
                isLoading={isLoading}
                onCancelClick={(id) => setCancelState({ id, loading: false })}
              />
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

        <SubscriptionDetailDialog
          open={detailDialogOpen}
          onOpenChange={setDetailDialogOpen}
          subscription={selectedSubscription}
        />

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


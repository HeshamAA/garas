import { DashboardLayout } from '@/shared/components/layout';
import { Pagination } from '@/shared/components/ui';
import { EmptyState } from '@/shared/components/EmptyState';
import RequestCard from '../components/RequestCard';
import { RequestsPageHeader } from '../components/RequestsPageHeader';
import { RequestsSearchBar } from '../components/RequestsSearchBar';
import { RequestsFiltersPanel } from '../components/RequestsFiltersPanel';
import { DateRangeFilter } from '../components/DateRangeFilter';
import { useReceiveRequestsPage } from '../hooks/useReceiveRequestsPage';
import { useAppDispatch } from '@/shared/hooks';
import { usePusherRequests } from '@/shared/hooks/usePusherRequests';
import { cancelRequest, approveRequest } from '../store/requestsThunks';
import toast from 'react-hot-toast';

export default function ReceiveRequestsPage() {
  const dispatch = useAppDispatch();

  // Initialize Pusher for real-time updates
  usePusherRequests();

  const {
    items,
    isLoading,
    error,
    pagination,
    searchQuery,
    setSearchQuery,
    showFilters,
    setShowFilters,
    howToReceiveFilter,
    setHowToReceiveFilter,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    dateRange,
    handleDateRangeChange,
    hasActiveFilters,
    handleSearch,
    handleApplyFilters,
    handleClearFilters,
    handlePageChange,
  } = useReceiveRequestsPage();

  const handleCancelRequest = async (id: number, reason?: string) => {
    try {
      await dispatch(cancelRequest({ id, reason })).unwrap();
      toast.success('تم رفض الطلب بنجاح');
    } catch (error) {
      toast.error('فشل رفض الطلب');
    }
  };

  const handleApproveRequest = async (id: number) => {
    try {
      await dispatch(approveRequest(id)).unwrap();
      toast.success('تم قبول الطلب بنجاح');
    } catch (error) {
      toast.error('فشل قبول الطلب');
    }
  };

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-destructive text-lg">{error}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <RequestsPageHeader />

        <div className="space-y-4 animate-slide-in-right">
          <DateRangeFilter
            selectedRange={dateRange}
            onRangeChange={handleDateRangeChange}
          />

          <RequestsSearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearchSubmit={handleSearch}
            showFilters={showFilters}
            onToggleFilters={() => setShowFilters(!showFilters)}
            hasActiveFilters={hasActiveFilters}
          />

          {showFilters && (
            <RequestsFiltersPanel
              howToReceiveFilter={howToReceiveFilter}
              onHowToReceiveChange={setHowToReceiveFilter}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              sortOrder={sortOrder}
              onSortOrderChange={setSortOrder}
              hasActiveFilters={hasActiveFilters}
              onApplyFilters={handleApplyFilters}
              onClearFilters={handleClearFilters}
              onClose={() => setShowFilters(false)}
            />
          )}
        </div>

        <div className="animate-zoom-in">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">جاري التحميل...</p>
            </div>
          ) : items && items.length > 0 ? (
            <div className="space-y-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((request) => (
                <RequestCard 
                  key={request.id} 
                  request={request} 
                  onCancel={handleCancelRequest}
                  onApprove={handleApproveRequest}
                  isLoading={isLoading} 
                />
              ))}
            </div>
          ) : (
            <EmptyState
              message="لا توجد طلبات استلام"
              description="لم يتم العثور على أي طلبات استلام حالياً."
            />
          )}
        </div>

        {pagination && (
          <Pagination metadata={pagination} onPageChange={handlePageChange} isLoading={isLoading} />
        )}
      </div>
    </DashboardLayout>
  );
}
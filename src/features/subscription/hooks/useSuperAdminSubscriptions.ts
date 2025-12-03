import { useState, useEffect, useCallback } from 'react';
import { subscriptionApi } from '../api/subscriptionApi';
import { SubscriptionDetail, SubscriptionQueryParams, SubscriptionStatus } from '../types/subscription.types';
import { useToast } from '@/shared/hooks';
import { PaginationMetadata } from '@/shared/types/pagination.types';

export const useSuperAdminSubscriptions = () => {
  const toast = useToast();
  const [filters, setFilters] = useState<SubscriptionQueryParams>({
    page: 1,
    limit: 10,
    sortOrder: 'ASC',
  });
  const [subscriptions, setSubscriptions] = useState<SubscriptionDetail[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
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
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<SubscriptionDetail | null>(null);

  const loadSubscriptions = useCallback(async (showLoader = true) => {
    try {
      if (showLoader) {
        setIsLoading(true);
      } else {
        setIsRefreshing(true);
      }
      const response = await subscriptionApi.getSubscriptions(filters);
      const items = Array.isArray(response.items) ? response.items : [];

      setSubscriptions(items);
      setPagination(response.metadata ?? null);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'تعذر تحميل البيانات';
      toast.error(`خطأ في تحميل الاشتراكات: ${message}`);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [filters, toast]);

  useEffect(() => {
    loadSubscriptions();
  }, [filters.page, filters.limit, filters.keyword, filters.status, filters.schoolId, filters.planId, filters.sortBy, filters.sortOrder]);

  const handleFilterChange = useCallback(<K extends keyof SubscriptionQueryParams>(key: K, value: SubscriptionQueryParams[K]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
      page: key === 'page' ? (value as number) : 1,
    }));
  }, []);

  const handleViewDetails = useCallback(async (id: number) => {
    try {
      setSelectedSubscription(null);
      setDetailDialogOpen(true);
      const response = await subscriptionApi.getSubscriptionById(id);
      setSelectedSubscription(response);
    } catch (error) {
      setDetailDialogOpen(false);
      const message = error instanceof Error ? error.message : 'حدث خطأ غير متوقع';
      toast.error(`تعذر تحميل التفاصيل: ${message}`);
    }
  }, [toast]);

  const handleCancelSubscription = useCallback(async () => {
    if (!cancelState.id) return;

    try {
      setCancelState((prev) => ({ ...prev, loading: true }));
      const response = await subscriptionApi.cancelSubscription(cancelState.id);
      toast.success(response.message || 'تم إلغاء الاشتراك بنجاح');
      setDetailDialogOpen(false);
      setSelectedSubscription(null);
      await loadSubscriptions(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'حدث خطأ غير متوقع';
      toast.error(`تعذر إلغاء الاشتراك: ${message}`);
    } finally {
      setCancelState({ id: null, loading: false });
    }
  }, [cancelState.id, loadSubscriptions, toast]);

  const handleRefresh = useCallback(() => {
    loadSubscriptions(false);
  }, [loadSubscriptions]);

  const handleSearch = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    setFilters((prev) => ({
      ...prev,
      keyword: searchQuery || undefined,
      page: 1,
    }));
  }, [searchQuery]);

  const handleApplyFilters = useCallback(() => {
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
  }, [statusFilter, schoolIdFilter, planIdFilter, sortByFilter, sortOrderFilter, limitFilter]);

  const handleClearFilters = useCallback(() => {
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
  }, []);

  const hasActiveFilters =
    statusFilter !== 'all' ||
    !!schoolIdFilter ||
    !!planIdFilter ||
    !!sortByFilter ||
    sortOrderFilter !== 'ASC' ||
    limitFilter !== '10';

  return {
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
    handleViewDetails,
    handleCancelSubscription,
    handleRefresh,
    handleSearch,
    handleApplyFilters,
    handleClearFilters,
  };
};

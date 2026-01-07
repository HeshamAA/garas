import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useAppSelector, useAppDispatch } from '@/shared/hooks';
import { fetchSchoolRequests } from '../store/requestsThunks';
import type { GetRequestsParams } from '../api/requestsApi';
import { getDateRange, DateRangeType } from '../utils/dateRangeUtils';

export const useReceiveRequestsPage = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading, error, pagination } = useAppSelector(
    (state) => state.requests.schoolRequests
  );

  const [params, setParams] = useState<GetRequestsParams>({
    page: 1,
    limit: 10,
    sortOrder: 'ASC',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [howToReceiveFilter, setHowToReceiveFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');
  const [dateRange, setDateRange] = useState<DateRangeType>('all');

  useEffect(() => {
    dispatch(fetchSchoolRequests(params))
      .unwrap()
      .catch((error) => {
        toast.error(error || 'حدث خطأ أثناء تحميل الطلبات');
      });
  }, [dispatch, params]);

  const handleDateRangeChange = useCallback(
    (range: DateRangeType) => {
      setDateRange(range);
      const dates = getDateRange(range);
      setParams({
        ...params,
        fromDate: dates.fromDate,
        toDate: dates.toDate,
        page: 1,
      });
    },
    [params]
  );

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setParams({ ...params, keyword: searchQuery, page: 1 });
    },
    [params, searchQuery]
  );

  const handleApplyFilters = useCallback(() => {
    setParams({
      ...params,
      howToReceive: howToReceiveFilter || undefined,
      status: statusFilter || undefined,
      sortBy: sortBy || undefined,
      sortOrder,
      page: 1,
    });
    setShowFilters(false);
    toast.success('تم تطبيق الفلاتر بنجاح');
  }, [params, howToReceiveFilter, statusFilter, sortBy, sortOrder]);

  const handleClearFilters = useCallback(() => {
    setHowToReceiveFilter('');
    setStatusFilter('');
    setSortBy('');
    setSortOrder('ASC');
    setDateRange('all');
    setParams({ page: 1, limit: 10, sortOrder: 'ASC' });
    toast.success('تم مسح الفلاتر');
  }, []);

  const handlePageChange = useCallback(
    (page: number) => {
      setParams({ ...params, page });
    },
    [params]
  );

  const hasActiveFilters = Boolean(
    howToReceiveFilter || statusFilter || sortBy || dateRange !== 'all'
  );

  return {
    // Data
    items,
    isLoading,
    error,
    pagination,

    // Search & Filters State
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

    // Handlers
    handleSearch,
    handleApplyFilters,
    handleClearFilters,
    handlePageChange,
  };
};

import { useState, useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@/shared/hooks';
import { fetchParents } from '../store/parentsThunks';
import type { GetParentsParams } from '../api/parentsApi';

export const useParentsPage = () => {
  const dispatch = useAppDispatch();
  const { items: parents, isLoading, error, pagination } = useAppSelector(
    (state) => state.parents
  );

  const [params, setParams] = useState<GetParentsParams>({
    page: 1,
    limit: 10,
    sortOrder: 'ASC',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [fullNameFilter, setFullNameFilter] = useState('');
  const [nationalIdFilter, setNationalIdFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');

  useEffect(() => {
    dispatch(fetchParents(params));
  }, [dispatch, params.page, params.limit, params.keyword, params.fullName, params.nationalId, params.sortBy, params.sortOrder]);

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
      fullName: fullNameFilter || undefined,
      nationalId: nationalIdFilter || undefined,
      sortBy: sortBy || undefined,
      sortOrder,
      page: 1,
    });
    setShowFilters(false);
  }, [params, fullNameFilter, nationalIdFilter, sortBy, sortOrder]);

  const handleClearFilters = useCallback(() => {
    setFullNameFilter('');
    setNationalIdFilter('');
    setSortBy('');
    setSortOrder('ASC');
    setParams({ page: 1, limit: 10, sortOrder: 'ASC' });
  }, []);

  const handlePageChange = useCallback(
    (page: number) => {
      setParams({ ...params, page });
    },
    [params]
  );

  const handleViewRequests = useCallback((parentId: number) => {
    console.log('View requests for parent:', parentId);
  }, []);

  const hasActiveFilters = Boolean(fullNameFilter || nationalIdFilter || sortBy);

  return {
    // Data
    parents,
    isLoading,
    error,
    pagination,
    
    // Search & Filters State
    searchQuery,
    setSearchQuery,
    showFilters,
    setShowFilters,
    fullNameFilter,
    setFullNameFilter,
    nationalIdFilter,
    setNationalIdFilter,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    hasActiveFilters,
    
    // Handlers
    handleSearch,
    handleApplyFilters,
    handleClearFilters,
    handlePageChange,
    handleViewRequests,
  };
};

import { useState, useCallback } from 'react';
import { useToast } from '@/shared/hooks';
import { useSchools } from './useSchools';

export const useRegisteredSchools = () => {
  const toast = useToast();
  const { items: schools, isLoading, error, pagination, changePage, search, refetch } = useSchools(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [nameFilter, setNameFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');

  const handleAddSchool = useCallback(() => {
    toast.info('سيتم إضافة نموذج تسجيل المدرسة قريباً');
  }, [toast]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    search(searchQuery);
  }, [search, searchQuery]);

  const handleApplyFilters = useCallback(() => {
    refetch({
      name: nameFilter || undefined,
      location: locationFilter || undefined,
      sortBy: sortBy || undefined,
      sortOrder,
      page: 1,
    });
    setShowFilters(false);
  }, [nameFilter, locationFilter, sortBy, sortOrder, refetch]);

  const handleClearFilters = useCallback(() => {
    setNameFilter('');
    setLocationFilter('');
    setSortBy('');
    setSortOrder('ASC');
    refetch({ page: 1 });
  }, [refetch]);

  const hasActiveFilters = Boolean(nameFilter || locationFilter || sortBy);

  return {
    schools,
    isLoading,
    error,
    pagination,
    searchQuery,
    setSearchQuery,
    showFilters,
    setShowFilters,
    nameFilter,
    setNameFilter,
    locationFilter,
    setLocationFilter,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    hasActiveFilters,
    changePage,
    handleAddSchool,
    handleSearch,
    handleApplyFilters,
    handleClearFilters,
  };
};

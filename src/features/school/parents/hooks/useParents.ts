import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { fetchParents, deleteParent } from '../store/parentsThunks';
import { setFilters, selectParent, clearError, invalidateCache } from '../store/parentsSlice';
import { ParentFilters } from '../types/parent.types';
import type { GetParentsParams } from '../api/parentsApi';

export const useParents = (params?: GetParentsParams) => {
  const dispatch = useAppDispatch();
  const { 
    items, 
    filters, 
    selectedItem: selectedParent,
    isLoading, 
    isUpdating,
    isCreating,
    isDeleting,
    error 
  } = useAppSelector(state => state.parents);

  useEffect(() => {
    dispatch(fetchParents(params));
  }, [dispatch, params]);
  const filteredParents = useMemo(() => {
    let filtered = items;

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(parent => 
        parent.fullName.toLowerCase().includes(query) ||
        parent.user.email.toLowerCase().includes(query) ||
        parent.user.phoneNumber.includes(query)
      );
    }

    return filtered;
  }, [items, filters]);
  const handleSetFilters = (newFilters: ParentFilters) => {
    dispatch(setFilters(newFilters));
  };

  const handleSelectParent = (parentId: number | null) => {
    const parent = parentId ? items.find(p => p.id === parentId) : null;
    dispatch(selectParent(parent || null));
  };

  const handleDeleteParent = async (parentId: string) => {
    try {
      await dispatch(deleteParent(parentId)).unwrap();
      return { success: true };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to delete parent';
      return { success: false, error: message };
    }
  };

  const handleRefresh = () => {
    dispatch(invalidateCache());
    dispatch(fetchParents(params));
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return {
    parents: filteredParents,
    allParents: items,
    filters,
    selectedParent,
    isLoading,
    isUpdating,
    isCreating,
    isDeleting,
    error,
    setFilters: handleSetFilters,
    selectParent: handleSelectParent,
    deleteParent: handleDeleteParent,
    refresh: handleRefresh,
    clearError: handleClearError,
  };
};
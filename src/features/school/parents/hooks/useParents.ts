import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { fetchParents, createParent, updateParent, deleteParent } from '../store/parentsThunks';
import { setFilters, selectParent, clearError, invalidateCache } from '../store/parentsSlice';
import { ParentFilters, CreateParentRequest, UpdateParentRequest } from '../types/parent.types';

export const useParents = (schoolId?: string) => {
  const dispatch = useAppDispatch();
  const { 
    items, 
    filters, 
    selectedParent,
    isLoading, 
    isUpdating,
    isCreating,
    isDeleting,
    error 
  } = useAppSelector(state => state.parents);
  useEffect(() => {
    if (schoolId) {
      dispatch(fetchParents(schoolId));
    }
  }, [dispatch, schoolId]);
  const filteredParents = useMemo(() => {
    let filtered = items;

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(parent => 
        parent.name.toLowerCase().includes(query) ||
        parent.email.toLowerCase().includes(query) ||
        parent.phone.includes(query)
      );
    }

    return filtered;
  }, [items, filters]);
  const handleSetFilters = (newFilters: ParentFilters) => {
    dispatch(setFilters(newFilters));
  };

  const handleSelectParent = (parentId: string | null) => {
    const parent = parentId ? items.find(p => p.id === parentId) : null;
    dispatch(selectParent(parent || null));
  };

  const handleCreateParent = async (parentData: CreateParentRequest) => {
    try {
      await dispatch(createParent(parentData)).unwrap();
      return { success: true };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to create parent';
      return { success: false, error: message };
    }
  };

  const handleUpdateParent = async (parentData: UpdateParentRequest) => {
    try {
      await dispatch(updateParent(parentData)).unwrap();
      return { success: true };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to update parent';
      return { success: false, error: message };
    }
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
    if (schoolId) {
      dispatch(fetchParents(schoolId));
    }
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
    createParent: handleCreateParent,
    updateParent: handleUpdateParent,
    deleteParent: handleDeleteParent,
    refresh: handleRefresh,
    clearError: handleClearError,
  };
};
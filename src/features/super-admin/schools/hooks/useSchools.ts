import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { 
  fetchSchools, 
  registerSchool 
} from '../store/schoolsThunks';
import { 
  clearError, 
  invalidateCache 
} from '../store/schoolsSlice';
import { RegisterSchoolRequest } from '../types/school.types';

export const useSchools = (userId?: string, autoFetch = true) => {
  const dispatch = useAppDispatch();
  const schools = useAppSelector(state => {
    const { items, filters } = state.schools;
    let filtered = items;

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(school => school.status === filters.status);
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(school => 
        school.name.toLowerCase().includes(query) ||
        school.location.toLowerCase().includes(query)
      );
    }

    return filtered;
  });

  const isLoading = useAppSelector(state => state.schools.isLoading);
  const isRegistering = useAppSelector(state => state.schools.isRegistering);
  const error = useAppSelector(state => state.schools.error);
  const filters = useAppSelector(state => state.schools.filters);
  useEffect(() => {
    if (autoFetch && userId) {
      dispatch(fetchSchools(userId));
    }
  }, [dispatch, userId, autoFetch]);
  const refetch = () => {
    if (userId) {
      dispatch(invalidateCache());
      dispatch(fetchSchools(userId));
    }
  };

  const register = async (schoolData: RegisterSchoolRequest) => {
    try {
      await dispatch(registerSchool(schoolData)).unwrap();
      return { success: true };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to register school';
      return { success: false, error: message };
    }
  };

  const clearErrorState = () => {
    dispatch(clearError());
  };

  return {
    schools,
    isLoading,
    isRegistering,
    error,
    filters,
    refetch,
    register,
    clearError: clearErrorState,
  };
};
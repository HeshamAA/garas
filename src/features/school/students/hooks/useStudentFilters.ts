import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { setFilters } from '../store/studentsSlice';
import { selectStudentFilters } from '../store/studentsSelectors';
import { StudentStatus } from '../types/student.types';

export const useStudentFilters = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectStudentFilters);

  const setStatusFilter = (status: StudentStatus | 'all') => {
    dispatch(setFilters({ ...filters, status }));
  };

  const setSearchQuery = (searchQuery: string) => {
    dispatch(setFilters({ ...filters, searchQuery }));
  };

  const resetFilters = () => {
    dispatch(setFilters({ status: 'all', searchQuery: '' }));
  };

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    dispatch(setFilters({ ...filters, ...newFilters }));
  };

  return {
    filters,
    setStatusFilter,
    setSearchQuery,
    resetFilters,
    updateFilters,
  };
};
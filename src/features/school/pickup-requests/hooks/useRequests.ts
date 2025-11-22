import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import {  fetchSchoolRequests } from '../store/requestsThunks';

export const useSchoolRequests = (schoolId?: string) => {
  const dispatch = useAppDispatch();
  const { items, filters, isLoading, error } = useAppSelector(
    (state) => state.requests.schoolRequests
  );

  useEffect(() => {
    if (schoolId) {
      dispatch(fetchSchoolRequests(schoolId));
    }
  }, [dispatch, schoolId]);

  const statusCounts = useMemo(() => {
    return {
      all: items.length,
      pending: items.filter((req) => req.status === 'pending').length,
      approved: items.filter((req) => req.status === 'approved').length,
      completed: items.filter((req) => req.status === 'completed').length,
      rejected: items.filter((req) => req.status === 'rejected').length,
    };
  }, [items]);

  return {

    filters,
    statusCounts,
    isLoading,
    error,
  };
};

export const useRequests = {
  school: useSchoolRequests,
};
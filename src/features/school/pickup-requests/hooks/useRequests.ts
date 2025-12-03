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
      waiting_outside: items.filter((req) => req.status === 'waiting_outside').length,
      deliverd: items.filter((req) => req.status === 'deliverd').length,
      canceld: items.filter((req) => req.status === 'canceld').length,
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
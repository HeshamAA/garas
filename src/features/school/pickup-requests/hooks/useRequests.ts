import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { fetchUserRequests, fetchSchoolRequests } from '../store/requestsThunks';
import { setUserFilters, setSchoolFilters } from '../store/requestsSlice';
import { RequestFilters, RequestStatus } from '../types/request.types';

export const useUserRequests = (userId?: string) => {
  const dispatch = useAppDispatch();
  const { items, filters, isLoading, error } = useAppSelector(
    (state) => state.requests.userRequests
  );

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserRequests(userId));
    }
  }, [dispatch, userId]);

  const setFilters = (newFilters: RequestFilters) => {
    dispatch(setUserFilters(newFilters));
  };
  const filteredRequests = useMemo(() => {
    let filtered = items;

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter((req) => req.status === filters.status);
    }

    if (filters.type && filters.type !== 'all') {
      filtered = filtered.filter((req) => req.type === filters.type);
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (req) =>
          req.studentName.toLowerCase().includes(query) ||
          req.requestNumber.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [items, filters]);
  const groupedRequests = useMemo(() => {
    return {
      proposed: filteredRequests.filter((req) => req.type === 'proposed'),
      current: filteredRequests.filter((req) => req.type === 'current'),
      completed: filteredRequests.filter((req) => req.type === 'completed'),
    };
  }, [filteredRequests]);

  return {
    requests: filteredRequests,
    groupedRequests,
    filters,
    setFilters,
    isLoading,
    error,
  };
};

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

  const setFilters = (newFilters: RequestFilters) => {
    dispatch(setSchoolFilters(newFilters));
  };
  const filteredRequests = useMemo(() => {
    let filtered = items;

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter((req) => req.status === filters.status);
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (req) =>
          req.parentName.toLowerCase().includes(query) ||
          req.studentName.toLowerCase().includes(query) ||
          req.requestNumber.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [items, filters]);
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
    requests: filteredRequests,
    filters,
    setFilters,
    statusCounts,
    isLoading,
    error,
  };
};

export const useRequests = {
  user: useUserRequests,
  school: useSchoolRequests,
};
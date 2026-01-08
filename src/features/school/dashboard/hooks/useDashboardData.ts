import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/shared/hooks';
import { statisticsApi } from '@/shared/api';
import { requestsApi } from '@/features/school/pickup-requests/api/requestsApi';
import type { SchoolStatistics } from '@/shared/types/statistics.types';
import type { PickupRequest } from '@/features/school/pickup-requests/types/request.types';
import type { UseDashboardDataReturn } from '../types/dashboard.types';

export const useDashboardData = (): UseDashboardDataReturn => {
  const [statistics, setStatistics] = useState<SchoolStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentRequests, setRecentRequests] = useState<PickupRequest[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const toast = useToast();

  const fetchStatistics = useCallback(async () => {
    setLoading(true);
    try {
      const response = await statisticsApi.getSchoolStatistics();
      setStatistics(response.data);
    } catch (error) {
      toast.error('فشل في تحميل الإحصائيات');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const fetchRecentRequests = useCallback(async () => {
    setLoadingRequests(true);
    try {
      const response = await requestsApi.getSchoolRequests({
        limit: 10,
        page: 1,
        sortBy: 'date',
        sortOrder: 'DESC',
        status: 'fast_request', // Filter only fast requests
      });
      // Take only first 5 fast requests
      setRecentRequests((response.data?.items || []).slice(0, 5));
    } catch (error) {
      console.error('Failed to fetch recent requests:', error);
    } finally {
      setLoadingRequests(false);
    }
  }, []);

  useEffect(() => {
    fetchStatistics();
    fetchRecentRequests();
  }, []);

  return {
    statistics,
    recentRequests,
    loading,
    loadingRequests,
    fetchStatistics,
    fetchRecentRequests,
  };
};

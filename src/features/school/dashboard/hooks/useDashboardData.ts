import { useState, useEffect, useCallback, useRef } from 'react';
import { useToast } from '@/shared/hooks';
import { statisticsApi } from '@/shared/api';
import { requestsApi } from '@/features/school/pickup-requests/api/requestsApi';
import type { SchoolStatistics } from '@/shared/types/statistics.types';
import type { PickupRequest } from '@/features/school/pickup-requests/types/request.types';

export interface UseDashboardDataReturn {
  statistics: SchoolStatistics | null;
  recentRequests: PickupRequest[];
  loading: boolean;
  loadingRequests: boolean;
  fetchStatistics: () => Promise<void>;
  fetchRecentRequests: () => Promise<void>;
}

export const useDashboardData = (): UseDashboardDataReturn => {
  const [statistics, setStatistics] = useState<SchoolStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentRequests, setRecentRequests] = useState<PickupRequest[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const toast = useToast();
  const toastRef = useRef(toast);
  toastRef.current = toast;

  const fetchStatistics = useCallback(async () => {
    setLoading(true);
    try {
      const response = await statisticsApi.getSchoolStatistics();
      setStatistics(response.data);
    } catch {
      toastRef.current.error('فشل في تحميل الإحصائيات');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRecentRequests = useCallback(async () => {
    setLoadingRequests(true);
    try {
      const response = await requestsApi.getSchoolRequests({
        sortBy: 'date',
        sortOrder: 'DESC',
        status: 'fast_request',
      });
      setRecentRequests(response.data?.items || []);
    } catch {
      console.error('Failed to fetch recent requests');
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

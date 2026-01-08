import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/shared/hooks';
import { statisticsApi } from '@/shared/api';
import { SuperAdminStatistics } from '../types/dashboard.types';

export const useSuperAdminDashboard = () => {
  const [statistics, setStatistics] = useState<SuperAdminStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchStatistics = useCallback(async () => {
    setLoading(true);
    try {
      const response = await statisticsApi.getSuperAdminStatistics();
      setStatistics(response.data);
    } catch (error) {
      toast.error('فشل في تحميل الإحصائيات');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchStatistics();
  }, []);

  return {
    statistics,
    loading,
    fetchStatistics,
  };
};

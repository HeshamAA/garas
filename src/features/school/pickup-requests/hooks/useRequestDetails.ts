import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/shared/hooks';
import { requestsApi } from '../api/requestsApi';
import type { PickupRequest } from '../types/request.types';

export const useRequestDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toastHelpers = useToast();
  const [request, setRequest] = useState<PickupRequest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchRequestDetails = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const response = await requestsApi.getRequestById(id);
        if (isMounted) {
          setRequest(response.data);
        }
      } catch (error) {
        if (isMounted) {
          toastHelpers.error('فشل في تحميل تفاصيل الطلب');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRequestDetails();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleBack = useCallback(() => {
    navigate('/receive-requests');
  }, [navigate]);

  return {
    request,
    loading,
    handleBack,
  };
};

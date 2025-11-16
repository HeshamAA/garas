import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import {
  createRequest,
  approveRequest,
  rejectRequest,
  completeRequest,
} from '../store/requestsThunks';
import { CreateRequestPayload } from '../types/request.types';
import { useToast } from '@/shared/hooks';

export const useRequestActions = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { isCreating, isUpdating } = useAppSelector((state) => state.requests);

  /**
   * Create a new pickup request
   */
  const handleCreateRequest = useCallback(
    async (requestData: CreateRequestPayload) => {
      try {
        await dispatch(createRequest(requestData)).unwrap();
        toast({
          title: 'تم إنشاء الطلب',
          description: 'تم إنشاء طلب الاستلام بنجاح',
        });
        return true;
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'فشل إنشاء الطلب';
        toast({
          title: 'خطأ',
          description: message,
          variant: 'destructive',
        });
        return false;
      }
    },
    [dispatch, toast]
  );

  /**
   * Approve a pickup request
   */
  const handleApproveRequest = useCallback(
    async (id: string, reason?: string) => {
      try {
        await dispatch(approveRequest({ id, status: 'approved', reason })).unwrap();
        toast({
          title: 'تمت الموافقة',
          description: 'تمت الموافقة على طلب الاستلام',
        });
        return true;
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'فشلت الموافقة على الطلب';
        toast({
          title: 'خطأ',
          description: message,
          variant: 'destructive',
        });
        return false;
      }
    },
    [dispatch, toast]
  );

  /**
   * Reject a pickup request
   */
  const handleRejectRequest = useCallback(
    async (id: string, reason?: string) => {
      try {
        await dispatch(rejectRequest({ id, status: 'rejected', reason })).unwrap();
        toast({
          title: 'تم الرفض',
          description: 'تم رفض طلب الاستلام',
        });
        return true;
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'فشل رفض الطلب';
        toast({
          title: 'خطأ',
          description: message,
          variant: 'destructive',
        });
        return false;
      }
    },
    [dispatch, toast]
  );

  /**
   * Complete a pickup request
   */
  const handleCompleteRequest = useCallback(
    async (id: string) => {
      try {
        await dispatch(completeRequest(id)).unwrap();
        toast({
          title: 'تم التسليم',
          description: 'تم تأكيد تسليم الطالب بنجاح',
        });
        return true;
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'فشل تأكيد التسليم';
        toast({
          title: 'خطأ',
          description: message,
          variant: 'destructive',
        });
        return false;
      }
    },
    [dispatch, toast]
  );

  return {
    createRequest: handleCreateRequest,
    approveRequest: handleApproveRequest,
    rejectRequest: handleRejectRequest,
    completeRequest: handleCompleteRequest,
    isCreating,
    isUpdating,
  };
};
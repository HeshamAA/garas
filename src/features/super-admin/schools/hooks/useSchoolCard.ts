import { useMemo, useCallback } from 'react';
import { useAppDispatch, useToast } from '@/shared/hooks';
import { toggleSchoolStatus } from '../store/schoolsThunks';
import { School } from '../types/school.types';

export const useSchoolCard = (school: School) => {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const schoolInitials = useMemo(() => {
    const parts = school.name.split(' ');
    return parts.length >= 2 
      ? `${parts[0][0]}${parts[1][0]}` 
      : school.name.substring(0, 2);
  }, [school.name]);

  const formattedDate = useMemo(() => {
    return new Date(school.createdAt).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }, [school.createdAt]);

  const isActive = school.status === 'active';

  const handleToggle = useCallback(async () => {
    try {
      const action = await dispatch(toggleSchoolStatus(school.id)).unwrap();
      toast.success(action.message || 'تم تحديث حالة المدرسة');
    } catch (err: unknown) {
      const msg = typeof err === 'string' ? err : (err instanceof Error ? err.message : 'فشل تحديث حالة المدرسة');
      toast.error(msg);
    }
  }, [dispatch, school.id, toast]);

  return {
    schoolInitials,
    formattedDate,
    isActive,
    handleToggle,
  };
};

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { closedTimeApi } from '../api/closedTime.api';
import toast from 'react-hot-toast';

export const useClosedTime = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['closedTime'],
    queryFn: closedTimeApi.getClosedTime,
  });

  const updateMutation = useMutation({
    mutationFn: closedTimeApi.updateClosedTime,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['closedTime'] });
      toast.success('تم تحديث وقت الخروج بنجاح');
    },
    onError: (error: Error) => {
      toast.error(error?.message || 'حدث خطأ أثناء تحديث وقت الخروج');
    },
  });

  return {
    closedTime: data?.closedTime,
    isLoading,
    error,
    updateClosedTime: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
};

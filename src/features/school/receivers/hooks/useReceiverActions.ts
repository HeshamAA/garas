import { useAppDispatch, useToast } from '@/shared/hooks';
import { fetchReceivers } from '../store/receiversThunks';

export const useReceiverActions = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const handleFetchReceivers = async (params?: any) => {
    try {
      await dispatch(fetchReceivers(params)).unwrap();
      toast({
        title: 'تم التحميل بنجاح',
        description: 'تم تحميل المستلمين بنجاح',
      });
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل تحميل المستلمين',
        variant: 'destructive',
      });
    }
  };

  return {
    handleFetchReceivers,
  };
};

export default useReceiverActions;
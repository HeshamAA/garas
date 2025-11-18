import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { 
  fetchReceivers, 
   
} from '../store/receiversThunks';


export const useReceivers = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { 
    receivers: { items, filters, isLoading, error },

  } = useAppSelector(state => state.receivers);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchReceivers(user.id));
    }
  }, [dispatch, user?.id]);


  const filteredReceivers = items.filter(receiver => {
    if (filters.status === 'all') return true;
    return receiver.status === filters.status;
  });

  return {
    receivers: filteredReceivers,
    filters,
    isLoading,
    error,


  };
};


export default useReceivers;
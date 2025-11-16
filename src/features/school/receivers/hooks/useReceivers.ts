import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { 
  fetchReceivers, 
  fetchTrustedReceivers 
} from '../store/receiversThunks';
import { 
  setReceiverFilters, 
  setTrustedReceiverFilters 
} from '../store/receiversSlice';
import { ReceiverFilters, TrustedReceiverFilters } from '../types/receiver.types';

export const useReceivers = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { 
    receivers: { items, filters, isLoading, error },
    isUpdating,
    isCreating,
    isDeleting
  } = useAppSelector(state => state.receivers);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchReceivers(user.id));
    }
  }, [dispatch, user?.id]);

  const handleFilterChange = (newFilters: ReceiverFilters) => {
    dispatch(setReceiverFilters(newFilters));
  };
  const filteredReceivers = items.filter(receiver => {
    if (filters.status === 'all') return true;
    return receiver.status === filters.status;
  });

  return {
    receivers: filteredReceivers,
    filters,
    isLoading,
    error,
    isUpdating,
    isCreating,
    isDeleting,
    handleFilterChange,
  };
};

export const useTrustedReceivers = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { 
    trustedReceivers: { items, filters, isLoading, error },
    isUpdating,
    isDeleting
  } = useAppSelector(state => state.receivers);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchTrustedReceivers(user.id));
    }
  }, [dispatch, user?.id]);

  const handleFilterChange = (newFilters: TrustedReceiverFilters) => {
    dispatch(setTrustedReceiverFilters(newFilters));
  };
  const filteredTrustedReceivers = items.filter(receiver => {
    return true;
  });

  return {
    trustedReceivers: filteredTrustedReceivers,
    filters,
    isLoading,
    error,
    isUpdating,
    isDeleting,
    handleFilterChange,
  };
};

export default useReceivers;
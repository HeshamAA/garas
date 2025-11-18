import { useAppDispatch, useToast } from '@/shared/hooks';
import {

} from '../store/receiversThunks';

export const useReceiverActions = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();

  return {

  };
};

export default useReceiverActions;
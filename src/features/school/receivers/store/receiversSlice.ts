import { createEntitySlice, BaseEntityState } from '@/shared/store/createEntitySlice';
import { Receiver, ReceiverFilters } from '../types/receiver.types';
import { fetchReceivers } from './receiversThunks';

// Define the state type using BaseEntityState
export type ReceiversState = BaseEntityState<Receiver, ReceiverFilters>;

// Create the receivers slice using the factory
const receiversSlice = createEntitySlice<Receiver, ReceiverFilters>({
  name: 'receivers',
  initialFilters: { status: 'all' },
  fetchThunk: fetchReceivers,
});

// Export actions
export const {
  setFilters,
  selectItem: selectReceiver,
  clearError,
  invalidateCache,
  resetState,
} = receiversSlice.actions;

export default receiversSlice.reducer;
import { createEntitySlice, BaseEntityState } from '@/shared/store/createEntitySlice';
import { Parent, ParentFilters } from '../types/parent.types';
import { 
  fetchParents, 
  deleteParent 
} from './parentsThunks';

// Define the state type using BaseEntityState
export type ParentsState = BaseEntityState<Parent, ParentFilters>;

// Create the parents slice using the factory
const parentsSlice = createEntitySlice<Parent, ParentFilters>({
  name: 'parents',
  initialFilters: {},
  fetchThunk: fetchParents,
  deleteThunk: deleteParent,
});

// Export actions with backward-compatible naming
export const {
  setFilters,
  selectItem: selectParent,
  clearError,
  invalidateCache,
  resetState,
} = parentsSlice.actions;

export default parentsSlice.reducer;
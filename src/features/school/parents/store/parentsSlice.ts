import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Parent, ParentFilters } from '../types/parent.types';
import { 
  fetchParents, 
  createParent, 
  updateParent, 
  deleteParent 
} from './parentsThunks';

interface ParentsState {
  items: Parent[];
  filters: ParentFilters;
  selectedParent: Parent | null;
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;
  isUpdating: boolean;
  isCreating: boolean;
  isDeleting: boolean;
}

const initialState: ParentsState = {
  items: [],
  filters: {},
  selectedParent: null,
  isLoading: false,
  error: null,
  lastFetched: null,
  isUpdating: false,
  isCreating: false,
  isDeleting: false,
};

const parentsSlice = createSlice({
  name: 'parents',
  initialState,
  reducers: {
    /**
     * Set filters for parents list
     */
    setFilters: (state, action: PayloadAction<ParentFilters>) => {
      state.filters = action.payload;
    },

    /**
     * Select a parent
     */
    selectParent: (state, action: PayloadAction<Parent | null>) => {
      state.selectedParent = action.payload;
    },

    /**
     * Clear error state
     */
    clearError: (state) => {
      state.error = null;
    },

    /**
     * Invalidate cache to force refetch
     */
    invalidateCache: (state) => {
      state.lastFetched = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchParents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchParents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchParents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Failed to fetch parents';
      })
      .addCase(createParent.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createParent.fulfilled, (state, action) => {
        state.isCreating = false;
        state.items.push(action.payload);
      })
      .addCase(createParent.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload as string || 'Failed to create parent';
      })
      .addCase(updateParent.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateParent.fulfilled, (state, action) => {
        state.isUpdating = false;
        const index = state.items.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateParent.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload as string || 'Failed to update parent';
      })
      .addCase(deleteParent.pending, (state) => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteParent.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.items = state.items.filter(p => p.id !== action.payload);
      })
      .addCase(deleteParent.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload as string || 'Failed to delete parent';
      });
  },
});

export const { setFilters, selectParent, clearError, invalidateCache } = parentsSlice.actions;
export default parentsSlice.reducer;
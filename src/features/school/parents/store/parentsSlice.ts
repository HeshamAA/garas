import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Parent, ParentFilters } from '../types/parent.types';
import { PaginationMetadata, PaginationLinks } from '@/shared/types/pagination.types';
import { 
  fetchParents, 
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
  pagination: PaginationMetadata | null;
  links: PaginationLinks | null;
}

const initialState: ParentsState = {
  items: [],
  filters: { status: 'all' },
  selectedParent: null,
  isLoading: false,
  error: null,
  lastFetched: null,
  isUpdating: false,
  isCreating: false,
  isDeleting: false,
  pagination: null,
  links: null,
};

const parentsSlice = createSlice({
  name: 'parents',
  initialState,
  reducers: {
 
    setFilters: (state, action: PayloadAction<ParentFilters>) => {
      state.filters = action.payload;
    },

    selectParent: (state, action: PayloadAction<Parent | null>) => {
      state.selectedParent = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

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
        state.items = action.payload.items;
        state.pagination = action.payload.metadata;
        state.links = action.payload.links;
        state.lastFetched = Date.now();
      })
      .addCase(fetchParents.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.payload)
        state.error = action.payload as string || 'Failed to fetch parents';
      })
      .addCase(deleteParent.pending, (state) => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteParent.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.items = state.items.filter(p => p.id.toString() !== action.payload);
      })
      .addCase(deleteParent.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload as string || 'Failed to delete parent';
      });
  },
});

export const { setFilters, selectParent, clearError, invalidateCache } = parentsSlice.actions;
export default parentsSlice.reducer;
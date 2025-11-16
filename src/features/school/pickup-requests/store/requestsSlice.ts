import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PickupRequest, SchoolRequest, RequestFilters } from '../types/request.types';
import {
  fetchUserRequests,
  fetchSchoolRequests,
  createRequest,
  approveRequest,
  rejectRequest,
  completeRequest,
} from './requestsThunks';

interface RequestsState {
  userRequests: {
    items: PickupRequest[];
    filters: RequestFilters;
    isLoading: boolean;
    error: string | null;
    lastFetched: number | null;
  };
  schoolRequests: {
    items: SchoolRequest[];
    filters: RequestFilters;
    isLoading: boolean;
    error: string | null;
    lastFetched: number | null;
  };
  selectedRequest: PickupRequest | SchoolRequest | null;
  isCreating: boolean;
  isUpdating: boolean;
}

const initialState: RequestsState = {
  userRequests: {
    items: [],
    filters: { status: 'all', type: 'all' },
    isLoading: false,
    error: null,
    lastFetched: null,
  },
  schoolRequests: {
    items: [],
    filters: { status: 'all' },
    isLoading: false,
    error: null,
    lastFetched: null,
  },
  selectedRequest: null,
  isCreating: false,
  isUpdating: false,
};

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    /**
     * Set filters for user requests
     */
    setUserFilters: (state, action: PayloadAction<RequestFilters>) => {
      state.userRequests.filters = action.payload;
    },

    /**
     * Set filters for school requests
     */
    setSchoolFilters: (state, action: PayloadAction<RequestFilters>) => {
      state.schoolRequests.filters = action.payload;
    },

    /**
     * Select a request
     */
    selectRequest: (state, action: PayloadAction<PickupRequest | SchoolRequest | null>) => {
      state.selectedRequest = action.payload;
    },

    /**
     * Clear error state
     */
    clearError: (state) => {
      state.userRequests.error = null;
      state.schoolRequests.error = null;
    },

    /**
     * Invalidate user requests cache
     */
    invalidateUserCache: (state) => {
      state.userRequests.lastFetched = null;
    },

    /**
     * Invalidate school requests cache
     */
    invalidateSchoolCache: (state) => {
      state.schoolRequests.lastFetched = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRequests.pending, (state) => {
        state.userRequests.isLoading = true;
        state.userRequests.error = null;
      })
      .addCase(fetchUserRequests.fulfilled, (state, action) => {
        state.userRequests.isLoading = false;
        state.userRequests.items = action.payload;
        state.userRequests.lastFetched = Date.now();
      })
      .addCase(fetchUserRequests.rejected, (state, action) => {
        state.userRequests.isLoading = false;
        state.userRequests.error = action.payload as string || 'Failed to fetch user requests';
      })
      .addCase(fetchSchoolRequests.pending, (state) => {
        state.schoolRequests.isLoading = true;
        state.schoolRequests.error = null;
      })
      .addCase(fetchSchoolRequests.fulfilled, (state, action) => {
        state.schoolRequests.isLoading = false;
        state.schoolRequests.items = action.payload;
        state.schoolRequests.lastFetched = Date.now();
      })
      .addCase(fetchSchoolRequests.rejected, (state, action) => {
        state.schoolRequests.isLoading = false;
        state.schoolRequests.error = action.payload as string || 'Failed to fetch school requests';
      })
      .addCase(createRequest.pending, (state) => {
        state.isCreating = true;
        state.userRequests.error = null;
      })
      .addCase(createRequest.fulfilled, (state, action) => {
        state.isCreating = false;
        state.userRequests.items.push(action.payload);
      })
      .addCase(createRequest.rejected, (state, action) => {
        state.isCreating = false;
        state.userRequests.error = action.payload as string || 'Failed to create request';
      })
      .addCase(approveRequest.pending, (state) => {
        state.isUpdating = true;
        state.schoolRequests.error = null;
      })
      .addCase(approveRequest.fulfilled, (state, action) => {
        state.isUpdating = false;
        const index = state.schoolRequests.items.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.schoolRequests.items[index] = action.payload;
        }
      })
      .addCase(approveRequest.rejected, (state, action) => {
        state.isUpdating = false;
        state.schoolRequests.error = action.payload as string || 'Failed to approve request';
      })
      .addCase(rejectRequest.pending, (state) => {
        state.isUpdating = true;
        state.schoolRequests.error = null;
      })
      .addCase(rejectRequest.fulfilled, (state, action) => {
        state.isUpdating = false;
        const index = state.schoolRequests.items.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.schoolRequests.items[index] = action.payload;
        }
      })
      .addCase(rejectRequest.rejected, (state, action) => {
        state.isUpdating = false;
        state.schoolRequests.error = action.payload as string || 'Failed to reject request';
      })
      .addCase(completeRequest.pending, (state) => {
        state.isUpdating = true;
        state.schoolRequests.error = null;
      })
      .addCase(completeRequest.fulfilled, (state, action) => {
        state.isUpdating = false;
        const index = state.schoolRequests.items.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.schoolRequests.items[index] = action.payload;
        }
      })
      .addCase(completeRequest.rejected, (state, action) => {
        state.isUpdating = false;
        state.schoolRequests.error = action.payload as string || 'Failed to complete request';
      });
  },
});

export const {
  setUserFilters,
  setSchoolFilters,
  selectRequest,
  clearError,
  invalidateUserCache,
  invalidateSchoolCache,
} = requestsSlice.actions;

export default requestsSlice.reducer;
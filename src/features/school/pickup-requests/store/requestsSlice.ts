import { createSlice } from '@reduxjs/toolkit';
import { PickupRequest, RequestFilters } from '../types/request.types';
import { PaginationMetadata, PaginationLinks } from '@/shared/types/pagination.types';
import { fetchSchoolRequests, cancelRequest, approveRequest } from './requestsThunks';

interface RequestsState {
  schoolRequests: {
    items: PickupRequest[];
    filters: RequestFilters;
    isLoading: boolean;
    error: string | null;
    lastFetched: number | null;
    pagination: PaginationMetadata | null;
    links: PaginationLinks | null;
  };
}

const initialState: RequestsState = {
  schoolRequests: {
    items: [],
    filters: { status: 'all' },
    isLoading: false,
    error: null,
    lastFetched: null,
    pagination: null,
    links: null,
  },
};

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    
      .addCase(fetchSchoolRequests.pending, (state) => {
        state.schoolRequests.isLoading = true;
        state.schoolRequests.error = null;
      })
      .addCase(fetchSchoolRequests.fulfilled, (state, action) => {
        state.schoolRequests.isLoading = false;
        state.schoolRequests.items = action.payload.items;
        state.schoolRequests.pagination = action.payload.metadata;
        state.schoolRequests.links = action.payload.links;
        state.schoolRequests.lastFetched = Date.now();
      })
      .addCase(fetchSchoolRequests.rejected, (state, action) => {
        state.schoolRequests.isLoading = false;
         console.log(action.payload)
        state.schoolRequests.error = action.payload as string || 'Failed to fetch school requests';
      })
      // Cancel request
      .addCase(cancelRequest.pending, (state) => {
        state.schoolRequests.isLoading = true;
      })
      .addCase(cancelRequest.fulfilled, (state, action) => {
        state.schoolRequests.isLoading = false;
        // Update the request status in the items array
        const requestIndex = state.schoolRequests.items.findIndex(
          (req) => req.id === action.payload.id
        );
        if (requestIndex !== -1) {
          state.schoolRequests.items[requestIndex].status = 'canceld';
        }
      })
      .addCase(cancelRequest.rejected, (state, action) => {
        state.schoolRequests.isLoading = false;
        state.schoolRequests.error = action.payload as string || 'Failed to cancel request';
      })
      // Approve request
      .addCase(approveRequest.pending, (state) => {
        state.schoolRequests.isLoading = true;
      })
      .addCase(approveRequest.fulfilled, (state, action) => {
        state.schoolRequests.isLoading = false;
        // Update the request status in the items array
        const requestIndex = state.schoolRequests.items.findIndex(
          (req) => req.id === action.payload.id
        );
        if (requestIndex !== -1) {
          state.schoolRequests.items[requestIndex].status = 'approved';
        }
      })
      .addCase(approveRequest.rejected, (state, action) => {
        state.schoolRequests.isLoading = false;
        state.schoolRequests.error = action.payload as string || 'Failed to approve request';
      });
  },
});

export default requestsSlice.reducer;
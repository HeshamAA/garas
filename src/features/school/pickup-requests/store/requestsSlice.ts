import { createSlice } from '@reduxjs/toolkit';
import { PickupRequest, RequestFilters } from '../types/request.types';
import { PaginationMetadata, PaginationLinks } from '@/shared/types/pagination.types';
import { fetchSchoolRequests } from './requestsThunks';

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
  reducers: {
   
  },
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
     
  },
});


export default requestsSlice.reducer;
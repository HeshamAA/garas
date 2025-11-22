import { createSlice } from '@reduxjs/toolkit';
import { PaginationMetadata, PaginationLinks } from '@/shared/types/pagination.types';
import { 
  ReceiversState 
} from '../types/receiver.types';
import {
  fetchReceivers,
} from './receiversThunks';

const initialState: ReceiversState = {
    items: [],
    filters: { status: 'all' },
    selectedReceiver: null,
    isLoading: false,
    error: null,
    lastFetched: null,
    pagination: null,
    links: null,
};

const receiversSlice = createSlice({
  name: 'receivers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReceivers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReceivers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items;
        state.pagination = action.payload.metadata;
        state.links = action.payload.links;
        state.lastFetched = Date.now();
      })
      .addCase(fetchReceivers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Failed to fetch receivers';
      })
     
  },
});

export default receiversSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
  Receiver, 
  TrustedReceiver, 
  ReceiverFilters, 
  TrustedReceiverFilters,
  ReceiversState 
} from '../types/receiver.types';
import {
  fetchReceivers,
  fetchTrustedReceivers,
  createReceiver,
  updateReceiver,
  updateReceiverStatus,
  deleteReceiver,
  approveTrustedReceiver,
  rejectTrustedReceiver,
  activateTrustedReceiver,
  deactivateTrustedReceiver,
} from './receiversThunks';

const initialState: ReceiversState = {
  receivers: {
    items: [],
    filters: { status: 'all' },
    selectedReceiver: null,
    isLoading: false,
    error: null,
    lastFetched: null,
  },
  trustedReceivers: {
    items: [],
    filters: { type: 'all' },
    selectedTrustedReceiver: null,
    isLoading: false,
    error: null,
    lastFetched: null,
  },
  isUpdating: false,
  isCreating: false,
  isDeleting: false,
};

const receiversSlice = createSlice({
  name: 'receivers',
  initialState,
  reducers: {
    setReceiverFilters: (state, action: PayloadAction<ReceiverFilters>) => {
      state.receivers.filters = action.payload;
    },
    selectReceiver: (state, action: PayloadAction<Receiver | null>) => {
      state.receivers.selectedReceiver = action.payload;
    },
    clearReceiverError: (state) => {
      state.receivers.error = null;
    },
    invalidateReceiverCache: (state) => {
      state.receivers.lastFetched = null;
    },
    setTrustedReceiverFilters: (state, action: PayloadAction<TrustedReceiverFilters>) => {
      state.trustedReceivers.filters = action.payload;
    },
    selectTrustedReceiver: (state, action: PayloadAction<TrustedReceiver | null>) => {
      state.trustedReceivers.selectedTrustedReceiver = action.payload;
    },
    clearTrustedReceiverError: (state) => {
      state.trustedReceivers.error = null;
    },
    invalidateTrustedReceiverCache: (state) => {
      state.trustedReceivers.lastFetched = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReceivers.pending, (state) => {
        state.receivers.isLoading = true;
        state.receivers.error = null;
      })
      .addCase(fetchReceivers.fulfilled, (state, action) => {
        state.receivers.isLoading = false;
        state.receivers.items = action.payload;
        state.receivers.lastFetched = Date.now();
      })
      .addCase(fetchReceivers.rejected, (state, action) => {
        state.receivers.isLoading = false;
        state.receivers.error = action.payload as string || 'Failed to fetch receivers';
      })
      .addCase(fetchTrustedReceivers.pending, (state) => {
        state.trustedReceivers.isLoading = true;
        state.trustedReceivers.error = null;
      })
      .addCase(fetchTrustedReceivers.fulfilled, (state, action) => {
        state.trustedReceivers.isLoading = false;
        state.trustedReceivers.items = action.payload;
        state.trustedReceivers.lastFetched = Date.now();
      })
      .addCase(fetchTrustedReceivers.rejected, (state, action) => {
        state.trustedReceivers.isLoading = false;
        state.trustedReceivers.error = action.payload as string || 'Failed to fetch trusted receivers';
      })
      .addCase(createReceiver.pending, (state) => {
        state.isCreating = true;
        state.receivers.error = null;
      })
      .addCase(createReceiver.fulfilled, (state, action) => {
        state.isCreating = false;
        state.receivers.items.push(action.payload);
      })
      .addCase(createReceiver.rejected, (state, action) => {
        state.isCreating = false;
        state.receivers.error = action.payload as string || 'Failed to create receiver';
      })
      .addCase(updateReceiver.pending, (state) => {
        state.isUpdating = true;
        state.receivers.error = null;
      })
      .addCase(updateReceiver.fulfilled, (state, action) => {
        state.isUpdating = false;
        const index = state.receivers.items.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.receivers.items[index] = action.payload;
        }
      })
      .addCase(updateReceiver.rejected, (state, action) => {
        state.isUpdating = false;
        state.receivers.error = action.payload as string || 'Failed to update receiver';
      })
      .addCase(updateReceiverStatus.pending, (state) => {
        state.isUpdating = true;
        state.receivers.error = null;
      })
      .addCase(updateReceiverStatus.fulfilled, (state, action) => {
        state.isUpdating = false;
        const index = state.receivers.items.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.receivers.items[index] = action.payload;
        }
      })
      .addCase(updateReceiverStatus.rejected, (state, action) => {
        state.isUpdating = false;
        state.receivers.error = action.payload as string || 'Failed to update receiver status';
      })
      .addCase(deleteReceiver.pending, (state) => {
        state.isDeleting = true;
        state.receivers.error = null;
      })
      .addCase(deleteReceiver.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.receivers.items = state.receivers.items.filter(r => r.id !== action.payload);
      })
      .addCase(deleteReceiver.rejected, (state, action) => {
        state.isDeleting = false;
        state.receivers.error = action.payload as string || 'Failed to delete receiver';
      })
      .addCase(approveTrustedReceiver.pending, (state) => {
        state.isUpdating = true;
        state.trustedReceivers.error = null;
      })
      .addCase(approveTrustedReceiver.fulfilled, (state, action) => {
        state.isUpdating = false;
        const index = state.trustedReceivers.items.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.trustedReceivers.items[index] = action.payload;
        }
      })
      .addCase(approveTrustedReceiver.rejected, (state, action) => {
        state.isUpdating = false;
        state.trustedReceivers.error = action.payload as string || 'Failed to approve trusted receiver';
      })
      .addCase(rejectTrustedReceiver.pending, (state) => {
        state.isDeleting = true;
        state.trustedReceivers.error = null;
      })
      .addCase(rejectTrustedReceiver.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.trustedReceivers.items = state.trustedReceivers.items.filter(r => r.id !== action.payload);
      })
      .addCase(rejectTrustedReceiver.rejected, (state, action) => {
        state.isDeleting = false;
        state.trustedReceivers.error = action.payload as string || 'Failed to reject trusted receiver';
      })
      .addCase(activateTrustedReceiver.pending, (state) => {
        state.isUpdating = true;
        state.trustedReceivers.error = null;
      })
      .addCase(activateTrustedReceiver.fulfilled, (state, action) => {
        state.isUpdating = false;
        const index = state.trustedReceivers.items.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.trustedReceivers.items[index] = action.payload;
        }
      })
      .addCase(activateTrustedReceiver.rejected, (state, action) => {
        state.isUpdating = false;
        state.trustedReceivers.error = action.payload as string || 'Failed to activate trusted receiver';
      })
      .addCase(deactivateTrustedReceiver.pending, (state) => {
        state.isUpdating = true;
        state.trustedReceivers.error = null;
      })
      .addCase(deactivateTrustedReceiver.fulfilled, (state, action) => {
        state.isUpdating = false;
        const index = state.trustedReceivers.items.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.trustedReceivers.items[index] = action.payload;
        }
      })
      .addCase(deactivateTrustedReceiver.rejected, (state, action) => {
        state.isUpdating = false;
        state.trustedReceivers.error = action.payload as string || 'Failed to deactivate trusted receiver';
      });
  },
});

export const {
  setReceiverFilters,
  selectReceiver,
  clearReceiverError,
  invalidateReceiverCache,
  setTrustedReceiverFilters,
  selectTrustedReceiver,
  clearTrustedReceiverError,
  invalidateTrustedReceiverCache,
} = receiversSlice.actions;

export default receiversSlice.reducer;
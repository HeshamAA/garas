/**
 * Example usage of enhanced createEntitySlice with custom reducers and thunks
 * 
 * This file demonstrates how to use the new features:
 * 1. additionalReducers - for custom synchronous reducers
 * 2. customExtraReducers - for custom async thunk cases
 */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { createEntitySlice } from './createEntitySlice';

// Example entity type
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

// Example filters type
interface UserFilters {
  status: string;
  searchTerm?: string;
}

// Example custom thunk
const toggleUserStatus = createAsyncThunk(
  'users/toggleStatus',
  async (userId: number, { rejectWithValue }) => {
    try {
      // API call would go here
      return { id: userId, isActive: true };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Create slice with custom reducers and thunks
const usersSlice = createEntitySlice<User, UserFilters>({
  name: 'users',
  initialFilters: { status: 'all' },
  
  // Standard CRUD thunks (optional)
  // fetchThunk: fetchUsers,
  // deleteThunk: deleteUser,
  
  // Custom synchronous reducers
  additionalReducers: {
    setSearchTerm: (state, action) => {
      state.filters.searchTerm = action.payload;
    },
    clearSearchTerm: (state) => {
      state.filters.searchTerm = undefined;
    },
  },
  
  // Custom async thunk cases
  customExtraReducers: (builder) => {
    builder
      .addCase(toggleUserStatus.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        state.isUpdating = false;
        const user = state.items.find(u => u.id === action.payload.id);
        if (user) {
          user.isActive = action.payload.isActive;
        }
      })
      .addCase(toggleUserStatus.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions (includes both common and custom reducers)
export const {
  setFilters,
  selectItem,
  clearError,
  invalidateCache,
  resetState,
  setSearchTerm,
  clearSearchTerm,
} = usersSlice.actions;

export default usersSlice.reducer;

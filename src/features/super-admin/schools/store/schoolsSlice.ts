import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { School, SchoolFilters } from '../types/school.types';
import { 
  fetchSchools, 
  searchSchools,
  registerSchool 
} from './schoolsThunks';

interface SchoolsState {
  items: School[];
  searchResults: School[];
  filters: SchoolFilters;
  searchQuery: string;
  selectedSchool: School | null;
  isLoading: boolean;
  isSearching: boolean;
  isRegistering: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: SchoolsState = {
  items: [],
  searchResults: [],
  filters: { status: 'all' },
  searchQuery: '',
  selectedSchool: null,
  isLoading: false,
  isSearching: false,
  isRegistering: false,
  error: null,
  lastFetched: null,
};

const schoolsSlice = createSlice({
  name: 'schools',
  initialState,
  reducers: {
    /**
     * Set filters for schools list
     */
    setFilters: (state, action: PayloadAction<SchoolFilters>) => {
      state.filters = action.payload;
    },

    /**
     * Set search query
     */
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    /**
     * Select a school
     */
    selectSchool: (state, action: PayloadAction<School | null>) => {
      state.selectedSchool = action.payload;
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

    /**
     * Clear search results
     */
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchQuery = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchools.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSchools.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchSchools.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Failed to fetch schools';
      })
      .addCase(searchSchools.pending, (state) => {
        state.isSearching = true;
        state.error = null;
      })
      .addCase(searchSchools.fulfilled, (state, action) => {
        state.isSearching = false;
        state.searchResults = action.payload;
      })
      .addCase(searchSchools.rejected, (state, action) => {
        state.isSearching = false;
        state.error = action.payload as string || 'Failed to search schools';
      })
      .addCase(registerSchool.pending, (state) => {
        state.isRegistering = true;
        state.error = null;
      })
      .addCase(registerSchool.fulfilled, (state, action) => {
        state.isRegistering = false;
        state.items.push(action.payload);
      })
      .addCase(registerSchool.rejected, (state, action) => {
        state.isRegistering = false;
        state.error = action.payload as string || 'Failed to register school';
      });
  },
});

export const { 
  setFilters, 
  setSearchQuery,
  selectSchool, 
  clearError, 
  invalidateCache,
  clearSearchResults 
} = schoolsSlice.actions;

export default schoolsSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { School, SchoolFilters } from '../types/school.types';
import { PaginationMetadata, PaginationLinks } from '@/shared/types/pagination.types';
import { 
  fetchSchools,
  toggleSchoolStatus,
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
  pagination: PaginationMetadata | null;
  links: PaginationLinks | null;
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
  pagination: null,
  links: null,
};

const schoolsSlice = createSlice({
  name: 'schools',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
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
      .addCase(fetchSchools.fulfilled, (state, action: PayloadAction<School[] | { items: School[]; metadata: PaginationMetadata; links: PaginationLinks }>) => {
        state.isLoading = false;
        if (Array.isArray(action.payload)) {
          state.items = action.payload;
        } else {
          state.items = action.payload.items || [];
          state.pagination = action.payload.metadata || null;
          state.links = action.payload.links || null;
        }
        state.lastFetched = Date.now();
      })
      .addCase(fetchSchools.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Failed to fetch schools';
      })
      .addCase(toggleSchoolStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(toggleSchoolStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const schoolId = action.payload.schoolId;
        const school = state.items.find(s => s.id === schoolId);
        if (school) {
          school.status = school.status === 'active' ? 'inactive' : 'active';
        }
      })
      .addCase(toggleSchoolStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Failed to toggle school status';
      });
  },
});

export const { setSearchQuery, clearSearchResults } = schoolsSlice.actions;
export default schoolsSlice.reducer;
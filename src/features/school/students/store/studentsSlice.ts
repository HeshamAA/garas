import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Student, StudentFilters } from '../types/student.types';
import { PaginationMetadata, PaginationLinks } from '@/shared/types/pagination.types';
import { 
  fetchStudents, 
  updateStudentStatus, 
  deleteStudent 
} from './studentsThunks';

interface StudentsState {
  items: Student[];
  filters: StudentFilters;
  selectedStudent: Student | null;
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;
  isUpdating: boolean;
  isCreating: boolean;
  isDeleting: boolean;
  pagination: PaginationMetadata | null;
  links: PaginationLinks | null;
}

const initialState: StudentsState = {
  items: [],
  filters: { status: 'all' },
  selectedStudent: null,
  isLoading: false,
  error: null,
  lastFetched: null,
  isUpdating: false,
  isCreating: false,
  isDeleting: false,
  pagination: null,
  links: null,
};

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items;
        state.pagination = action.payload.metadata;
        state.links = action.payload.links;
        state.lastFetched = Date.now();
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.payload)
        state.error = action.payload as string || 'Failed to fetch students';
      })

      .addCase(deleteStudent.pending, (state) => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.items = state.items.filter(s => s.id !== action.payload);
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload as string || 'Failed to delete student';
      });
  },
});

export default studentsSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Student, StudentFilters } from '../types/student.types';
import { 
  fetchStudents, 
  updateStudentStatus, 
  createStudent, 
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
};

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    /**
     * Set filters for students list
     */
    setFilters: (state, action: PayloadAction<StudentFilters>) => {
      state.filters = action.payload;
    },

    /**
     * Select a student
     */
    selectStudent: (state, action: PayloadAction<Student | null>) => {
      state.selectedStudent = action.payload;
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Failed to fetch students';
      })
      .addCase(updateStudentStatus.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateStudentStatus.fulfilled, (state, action) => {
        state.isUpdating = false;
        const index = state.items.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateStudentStatus.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload as string || 'Failed to update status';
      })
      .addCase(createStudent.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.isCreating = false;
        state.items.push(action.payload);
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload as string || 'Failed to create student';
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

export const { setFilters, selectStudent, clearError, invalidateCache } = studentsSlice.actions;
export default studentsSlice.reducer;
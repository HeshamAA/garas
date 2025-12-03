import { createEntitySlice, BaseEntityState } from '@/shared/store/createEntitySlice';
import { Student, StudentFilters } from '../types/student.types';
import { 
  fetchStudents, 
  updateStudentStatus, 
  deleteStudent 
} from './studentsThunks';

// Define the state type using BaseEntityState
export type StudentsState = BaseEntityState<Student, StudentFilters>;

// Create the students slice using the factory
const studentsSlice = createEntitySlice<Student, StudentFilters>({
  name: 'students',
  initialFilters: { status: 'all' },
  fetchThunk: fetchStudents,
  updateThunk: updateStudentStatus,
  deleteThunk: deleteStudent,
});

// Export actions
export const {
  setFilters,
  selectItem: selectStudent,
  clearError,
  invalidateCache,
  resetState,
} = studentsSlice.actions;

export default studentsSlice.reducer;
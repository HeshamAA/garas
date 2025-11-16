import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/shared/store/store';

export const selectStudentsState = (state: RootState) => state.students;
export const selectAllStudents = (state: RootState) => state.students.items;
export const selectStudentFilters = (state: RootState) => state.students.filters;
export const selectStudentsLoading = (state: RootState) => state.students.isLoading;
export const selectStudentsError = (state: RootState) => state.students.error;
export const selectSelectedStudent = (state: RootState) => state.students.selectedStudent;

export const selectFilteredStudents = createSelector(
  [selectAllStudents, selectStudentFilters],
  (students, filters) => {
    let filtered = students;
    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(s => s.status === filters.status);
    }
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(query) ||
        s.guardianName.toLowerCase().includes(query) ||
        (s.receiverName && s.receiverName.toLowerCase().includes(query))
      );
    }

    return filtered;
  }
);

export const selectActiveStudents = createSelector(
  [selectAllStudents],
  (students) => students.filter(s => s.status === 'active')
);

export const selectInactiveStudents = createSelector(
  [selectAllStudents],
  (students) => students.filter(s => s.status === 'inactive')
);

export const selectPendingStudents = createSelector(
  [selectAllStudents],
  (students) => students.filter(s => s.status === 'pending')
);

export const selectStudentById = (id: string) =>
  createSelector(
    [selectAllStudents],
    (students) => students.find(s => s.id === id)
  );

export const selectStudentCounts = createSelector(
  [selectAllStudents],
  (students) => ({
    total: students.length,
    active: students.filter(s => s.status === 'active').length,
    inactive: students.filter(s => s.status === 'inactive').length,
    pending: students.filter(s => s.status === 'pending').length,
  })
);
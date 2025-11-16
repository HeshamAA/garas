import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { 
  fetchStudents, 
  updateStudentStatus, 
  createStudent, 
  deleteStudent 
} from '../store/studentsThunks';
import { 
  selectFilteredStudents,
  selectStudentsLoading,
  selectStudentsError,
  selectStudentCounts
} from '../store/studentsSelectors';
import { 
  clearError, 
  invalidateCache 
} from '../store/studentsSlice';
import { CreateStudentRequest, StudentStatus } from '../types/student.types';

export const useStudents = (schoolId?: string, autoFetch = true) => {
  const dispatch = useAppDispatch();
  const students = useAppSelector(selectFilteredStudents);
  const isLoading = useAppSelector(state => state.students.isLoading);
  const isUpdating = useAppSelector(state => state.students.isUpdating);
  const isCreating = useAppSelector(state => state.students.isCreating);
  const isDeleting = useAppSelector(state => state.students.isDeleting);
  const error = useAppSelector(selectStudentsError);
  const counts = useAppSelector(selectStudentCounts);
  useEffect(() => {
    if (autoFetch && schoolId) {
      dispatch(fetchStudents(schoolId));
    }
  }, [dispatch, schoolId, autoFetch]);
  const refetch = () => {
    if (schoolId) {
      dispatch(invalidateCache());
      dispatch(fetchStudents(schoolId));
    }
  };

  const updateStatus = async (id: string, status: StudentStatus) => {
    try {
      await dispatch(updateStudentStatus({ id, status })).unwrap();
      return { success: true };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to update status';
      return { success: false, error: message };
    }
  };

  const create = async (studentData: CreateStudentRequest) => {
    try {
      await dispatch(createStudent(studentData)).unwrap();
      return { success: true };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to create student';
      return { success: false, error: message };
    }
  };

  const remove = async (id: string) => {
    try {
      await dispatch(deleteStudent(id)).unwrap();
      return { success: true };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to delete student';
      return { success: false, error: message };
    }
  };

  const clearErrorState = () => {
    dispatch(clearError());
  };

  return {
    students,
    isLoading,
    isUpdating,
    isCreating,
    isDeleting,
    error,
    counts,
    refetch,
    updateStatus,
    create,
    remove,
    clearError: clearErrorState,
  };
};
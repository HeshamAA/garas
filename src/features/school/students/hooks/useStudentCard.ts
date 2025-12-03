import { useMemo, useCallback } from 'react';
import { Student } from '../types/student.types';
import { getInitials, formatDate } from '../utils/studentFormatters';

export const useStudentCard = (
  student: Student,
  onViewRequests?: (studentId: number) => void
) => {
  const initials = useMemo(() => getInitials(student.fullName), [student.fullName]);

  const formattedDate = useMemo(() => formatDate(student.dateOfBirth), [student.dateOfBirth]);

  const handleViewRequests = useCallback(() => {
    onViewRequests?.(student.id);
  }, [onViewRequests, student.id]);

  return {
    initials,
    formattedDate,
    handleViewRequests,
  };
};

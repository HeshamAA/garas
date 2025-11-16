import { Student } from '../types/student.types';
import { StudentCard } from './StudentCard';

interface StudentListProps {
  students: Student[];
  isLoading?: boolean;
  emptyMessage?: string;
  onViewRequests?: (studentId: string) => void;
  onStatusUpdate?: (studentId: string, status: Student['status']) => void;
}

export const StudentList = ({ 
  students, 
  isLoading = false,
  emptyMessage = 'لا توجد طلاب',
  onViewRequests,
  onStatusUpdate
}: StudentListProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-muted-foreground text-lg">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {students.map((student) => (
        <StudentCard
          key={student.id}
          student={student}
          onViewRequests={onViewRequests}
          onStatusUpdate={onStatusUpdate}
        />
      ))}
    </div>
  );
};
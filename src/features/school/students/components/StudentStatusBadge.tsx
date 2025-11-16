import StatusBadge from '@/shared/components/common/StatusBadge';
import { StudentStatus } from '../types/student.types';

interface StudentStatusBadgeProps {
  status: StudentStatus;
  className?: string;
}

export const StudentStatusBadge = ({ status, className }: StudentStatusBadgeProps) => {
  return <StatusBadge status={status} className={className} />;
};
import { School } from '../types/school.types';
import { SchoolCard } from './SchoolCard';

interface SchoolListProps {
  schools: School[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export const SchoolList = ({ 
  schools, 
  isLoading = false,
  emptyMessage = 'لا توجد مدارس مسجلة'
}: SchoolListProps) => {
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

  if (schools.length === 0) {
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
      {schools.map((school) => (
        <SchoolCard
          key={school.id}
          school={school}
        />
      ))}
    </div>
  );
};
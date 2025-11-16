import { Button } from '@/components/ui/button';
import { StudentStatus } from '../types/student.types';

interface FilterOption {
  label: string;
  value: StudentStatus | 'all';
}

interface StudentFiltersProps {
  activeFilter: StudentStatus | 'all';
  onFilterChange: (filter: StudentStatus | 'all') => void;
}

const FILTER_OPTIONS: FilterOption[] = [
  { label: 'الكل', value: 'all' },
  { label: 'نشط', value: 'active' },
  { label: 'غير نشط', value: 'inactive' },
  { label: 'قيد الانتظار', value: 'pending' },
];

export const StudentFilters = ({ 
  activeFilter, 
  onFilterChange 
}: StudentFiltersProps) => {
  return (
    <div className="flex justify-end gap-4 mb-8">
      {FILTER_OPTIONS.map((filter) => (
        <Button
          key={filter.value}
          variant={activeFilter === filter.value ? 'default' : 'outline'}
          className="rounded-full px-8"
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
};
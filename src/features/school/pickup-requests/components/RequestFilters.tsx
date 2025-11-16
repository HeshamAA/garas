import { Button } from '@/components/ui/button';
import { RequestStatus } from '../types/request.types';

interface FilterOption {
  label: string;
  value: RequestStatus | 'all';
  active: boolean;
  count?: number;
}

interface RequestFiltersProps {
  filters: FilterOption[];
  onChange: (value: RequestStatus | 'all') => void;
  className?: string;
}

const RequestFilters = ({ filters, onChange, className = '' }: RequestFiltersProps) => {
  return (
    <div className={`flex gap-3 justify-center flex-wrap ${className}`}>
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={filter.active ? 'default' : 'outline'}
          className="rounded-full px-8 py-5 text-base"
          onClick={() => onChange(filter.value)}
        >
          {filter.label}
          {filter.count !== undefined && filter.count > 0 && ` (${filter.count})`}
        </Button>
      ))}
    </div>
  );
};

export default RequestFilters;
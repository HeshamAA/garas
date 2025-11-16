import { Button } from '@/components/ui/button';
import { FilterOption } from '@/shared/types';

interface FilterButtonsProps {
  options: FilterOption[];
  onChange: (value: string) => void;
  className?: string;
}

const FilterButtons = ({ options, onChange, className = '' }: FilterButtonsProps) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {options.map((option) => (
        <Button
          key={option.value}
          variant={option.active ? 'default' : 'outline'}
          size="sm"
          onClick={() => onChange(option.value)}
          className="rounded-full"
        >
          {option.label}
          {option.count !== undefined && (
            <span className="ml-2 px-2 py-0.5 rounded-full bg-background/20 text-xs">
              {option.count}
            </span>
          )}
        </Button>
      ))}
    </div>
  );
};

export default FilterButtons;
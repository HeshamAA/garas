import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FilterField as FilterFieldType } from '@/shared/types/filter.types';

interface FilterFieldProps {
  field: FilterFieldType;
}

/**
 * FilterField component renders individual filter fields based on their type
 * Supports text, number, and select input types
 */
export const FilterField = ({ field }: FilterFieldProps) => {
  const { name, label, type, placeholder, options, value, onChange } = field;

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-medium text-right block">
        {label}
      </label>
      
      {type === 'select' && options ? (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger id={name} className="text-right">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          id={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-right"
        />
      )}
    </div>
  );
};

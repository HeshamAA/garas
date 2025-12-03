import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { SearchBarProps } from '@/shared/types';
import { useSearchBar } from './hooks/useSearchBar';

const SearchBar = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
  debounceMs = 300,
}: SearchBarProps) => {
  const { localValue, setLocalValue } = useSearchBar(value, onChange, debounceMs);

  return (
    <div className={`relative ${className}`}>
      <Input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className="pr-10"
      />
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
    </div>
  );
};

export default SearchBar;
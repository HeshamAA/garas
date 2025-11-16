import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface SchoolSearchBarProps {
  onSearch: (query: string) => void;
  onClear?: () => void;
  placeholder?: string;
  isSearching?: boolean;
}

export const SchoolSearchBar = ({ 
  onSearch, 
  onClear,
  placeholder = 'ابحث عن مدرسة...',
  isSearching = false
}: SchoolSearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    if (onClear) {
      onClear();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="pr-10 text-right"
          disabled={isSearching}
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <Button 
        onClick={handleSearch}
        disabled={!query.trim() || isSearching}
        className="rounded-full"
      >
        {isSearching ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
        ) : (
          <>
            <Search className="w-4 h-4 ml-2" />
            بحث
          </>
        )}
      </Button>
    </div>
  );
};
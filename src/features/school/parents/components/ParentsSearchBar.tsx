import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal } from 'lucide-react';

interface ParentsSearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  hasActiveFilters: boolean;
}

export const ParentsSearchBar = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  showFilters,
  onToggleFilters,
  hasActiveFilters,
}: ParentsSearchBarProps) => {
  return (
    <div className="flex gap-3" dir="rtl">
      <form onSubmit={onSearchSubmit} className="relative flex-1">
        <Input
          placeholder="ابحث عن اسم ولي الأمر أو الرقم القومي"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-card text-foreground border rounded-full h-12 pr-12 text-right placeholder:text-right"
        />
        <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2">
          <Search className="w-5 h-5 text-muted-foreground" />
        </button>
      </form>

      <Button
        variant={showFilters ? 'default' : 'outline'}
        onClick={onToggleFilters}
        className="rounded-full px-6 gap-2"
      >
        <SlidersHorizontal className="w-4 h-4" />
        فلترة
        {hasActiveFilters && (
          <span className="bg-primary-foreground text-primary rounded-full w-5 h-5 text-xs flex items-center justify-center">
            !
          </span>
        )}
      </Button>
    </div>
  );
};

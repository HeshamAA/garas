import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';
import { GenericFilterPanelProps } from '@/shared/types/filter.types';
import { FilterField } from './FilterField';

/**
 * GenericFilterPanel component provides a reusable filter panel with dynamic fields
 * Supports multiple filter types, sorting, and common actions (apply, clear, close)
 */
export const GenericFilterPanel = ({
  title = 'خيارات الفلترة والترتيب',
  fields,
  sortBy,
  onSortByChange,
  sortByOptions,
  sortOrder,
  onSortOrderChange,
  hasActiveFilters,
  onApply,
  onClear,
  onClose,
}: GenericFilterPanelProps) => {
  return (
    <div className="bg-card border rounded-lg p-6 space-y-4" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Filter Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Dynamic Filter Fields */}
        {fields.map((field) => (
          <FilterField key={field.name} field={field} />
        ))}

        {/* Sort By Field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-right block">ترتيب حسب</label>
          <Select value={sortBy} onValueChange={onSortByChange}>
            <SelectTrigger className="text-right">
              <SelectValue placeholder="اختر الترتيب" />
            </SelectTrigger>
            <SelectContent>
              {sortByOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort Order Field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-right block">نوع الترتيب</label>
          <Select value={sortOrder} onValueChange={onSortOrderChange}>
            <SelectTrigger className="text-right">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ASC">تصاعدي</SelectItem>
              <SelectItem value="DESC">تنازلي</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t">
        <Button
          variant="outline"
          onClick={onClear}
          className="flex-1 rounded-full"
          disabled={!hasActiveFilters}
        >
          مسح الفلاتر
        </Button>
        <Button onClick={onApply} className="flex-1 rounded-full">
          تطبيق الفلاتر
        </Button>
      </div>
    </div>
  );
};

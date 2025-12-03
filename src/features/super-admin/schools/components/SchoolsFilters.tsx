import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

interface SchoolsFiltersProps {
  nameFilter: string;
  onNameChange: (value: string) => void;
  locationFilter: string;
  onLocationChange: (value: string) => void;
  sortBy: string;
  onSortByChange: (value: string) => void;
  sortOrder: 'ASC' | 'DESC';
  onSortOrderChange: (value: 'ASC' | 'DESC') => void;
  hasActiveFilters: boolean;
  onApply: () => void;
  onClear: () => void;
  onClose: () => void;
}

export const SchoolsFilters = ({
  nameFilter,
  onNameChange,
  locationFilter,
  onLocationChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
  hasActiveFilters,
  onApply,
  onClear,
  onClose,
}: SchoolsFiltersProps) => {
  return (
    <div className="bg-card border rounded-lg p-6 space-y-4" dir="rtl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">خيارات الفلترة والترتيب</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-right block">اسم المدرسة</label>
          <Input
            placeholder="ابحث بالاسم"
            value={nameFilter}
            onChange={(e) => onNameChange(e.target.value)}
            className="text-right"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-right block">الموقع</label>
          <Input
            placeholder="ابحث بالموقع"
            value={locationFilter}
            onChange={(e) => onLocationChange(e.target.value)}
            className="text-right"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-right block">ترتيب حسب</label>
          <Select value={sortBy} onValueChange={onSortByChange}>
            <SelectTrigger className="text-right">
              <SelectValue placeholder="اختر الترتيب" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">الاسم</SelectItem>
              <SelectItem value="location">الموقع</SelectItem>
              <SelectItem value="createdAt">تاريخ التسجيل</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-right block">نوع الترتيب</label>
          <Select value={sortOrder} onValueChange={(value: 'ASC' | 'DESC') => onSortOrderChange(value)}>
            <SelectTrigger className="text-right">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ASC">تصاعدي (أ-ي)</SelectItem>
              <SelectItem value="DESC">تنازلي (ي-أ)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

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

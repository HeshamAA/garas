import { GenericFilterPanel } from '@/shared/components/common/GenericFilterPanel';
import { FilterField } from '@/shared/types/filter.types';

interface ParentsFiltersPanelProps {
  fullNameFilter: string;
  onFullNameChange: (value: string) => void;
  nationalIdFilter: string;
  onNationalIdChange: (value: string) => void;
  sortBy: string;
  onSortByChange: (value: string) => void;
  sortOrder: 'ASC' | 'DESC';
  onSortOrderChange: (value: 'ASC' | 'DESC') => void;
  hasActiveFilters: boolean;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  onClose: () => void;
}

export const ParentsFiltersPanel = ({
  fullNameFilter,
  onFullNameChange,
  nationalIdFilter,
  onNationalIdChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
  hasActiveFilters,
  onApplyFilters,
  onClearFilters,
  onClose,
}: ParentsFiltersPanelProps) => {
  // Configure filter fields
  const filterFields: FilterField[] = [
    {
      name: 'fullName',
      label: 'الاسم الكامل',
      type: 'text',
      placeholder: 'ابحث بالاسم',
      value: fullNameFilter,
      onChange: onFullNameChange,
    },
    {
      name: 'nationalId',
      label: 'الرقم القومي',
      type: 'text',
      placeholder: 'ابحث بالرقم القومي',
      value: nationalIdFilter,
      onChange: onNationalIdChange,
    },
  ];

  // Configure sort options
  const sortByOptions = [
    { value: 'fullName', label: 'الاسم' },
    { value: 'nationalId', label: 'الرقم القومي' },
    { value: 'createdAt', label: 'تاريخ التسجيل' },
  ];

  return (
    <GenericFilterPanel
      fields={filterFields}
      sortBy={sortBy}
      onSortByChange={onSortByChange}
      sortByOptions={sortByOptions}
      sortOrder={sortOrder}
      onSortOrderChange={onSortOrderChange}
      hasActiveFilters={hasActiveFilters}
      onApply={onApplyFilters}
      onClear={onClearFilters}
      onClose={onClose}
    />
  );
};

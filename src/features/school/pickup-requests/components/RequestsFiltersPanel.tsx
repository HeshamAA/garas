import { GenericFilterPanel } from '@/shared/components/common/GenericFilterPanel';
import { FilterField } from '@/shared/types/filter.types';

interface RequestsFiltersPanelProps {
  howToReceiveFilter: string;
  onHowToReceiveChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  sortBy: string;
  onSortByChange: (value: string) => void;
  sortOrder: 'ASC' | 'DESC';
  onSortOrderChange: (value: 'ASC' | 'DESC') => void;
  hasActiveFilters: boolean;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  onClose: () => void;
}

export const RequestsFiltersPanel = ({
  howToReceiveFilter,
  onHowToReceiveChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
  hasActiveFilters,
  onApplyFilters,
  onClearFilters,
  onClose,
}: RequestsFiltersPanelProps) => {
  // Configure filter fields
  const filterFields: FilterField[] = [
    {
      name: 'howToReceive',
      label: 'طريقة الاستلام',
      type: 'select',
      placeholder: 'اختر طريقة الاستلام',
      value: howToReceiveFilter,
      onChange: onHowToReceiveChange,
      options: [
        { value: 'person', label: 'شخصياً' },
        { value: 'car', label: 'بالسيارة' },
      ],
    },
    {
      name: 'status',
      label: 'الحالة',
      type: 'select',
      placeholder: 'اختر الحالة',
      value: statusFilter,
      onChange: onStatusChange,
      options: [
        { value: 'pending', label: 'قيد الانتظار' },
        { value: 'waiting_outside', label: 'بانتظار الاستلام' },
        { value: 'deliverd', label: 'تم التسليم' },
        { value: 'canceld', label: 'ملغي' },
      ],
    },
  ];

  // Configure sort options
  const sortByOptions = [
    { value: 'createdAt', label: 'تاريخ الإنشاء' },
    { value: 'status', label: 'الحالة' },
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

import { GenericFilterPanel } from '@/shared/components/common/GenericFilterPanel';
import { FilterField } from '@/shared/types/filter.types';
import { SubscriptionStatus } from '../types/subscription.types';
import { STATUS_OPTIONS } from '../types/subscription-page.types';

interface SubscriptionsFiltersProps {
  statusFilter: SubscriptionStatus | 'all';
  onStatusChange: (value: SubscriptionStatus | 'all') => void;
  schoolIdFilter: string;
  onSchoolIdChange: (value: string) => void;
  planIdFilter: string;
  onPlanIdChange: (value: string) => void;
  sortByFilter: string;
  onSortByChange: (value: string) => void;
  sortOrderFilter: 'ASC' | 'DESC';
  onSortOrderChange: (value: 'ASC' | 'DESC') => void;
  limitFilter: string;
  onLimitChange: (value: string) => void;
  hasActiveFilters: boolean;
  onApply: () => void;
  onClear: () => void;
  onClose: () => void;
}

const SORT_BY_OPTIONS = [
  { value: 'startDate', label: 'تاريخ البداية' },
  { value: 'endDate', label: 'تاريخ النهاية' },
  { value: 'createdAt', label: 'تاريخ الإنشاء' },
  { value: 'schoolId', label: 'رقم المدرسة' },
];

const LIMIT_OPTIONS = [
  { value: '10', label: '10' },
  { value: '20', label: '20' },
  { value: '50', label: '50' },
];

export const SubscriptionsFilters = ({
  statusFilter,
  onStatusChange,
  schoolIdFilter,
  onSchoolIdChange,
  planIdFilter,
  onPlanIdChange,
  sortByFilter,
  onSortByChange,
  sortOrderFilter,
  onSortOrderChange,
  limitFilter,
  onLimitChange,
  hasActiveFilters,
  onApply,
  onClear,
  onClose,
}: SubscriptionsFiltersProps) => {
  const filterFields: FilterField[] = [
    {
      name: 'status',
      label: 'الحالة',
      type: 'select',
      placeholder: 'كل الحالات',
      options: STATUS_OPTIONS.map(opt => ({ value: opt.value, label: opt.label })),
      value: statusFilter,
      onChange: (value) => onStatusChange(value as SubscriptionStatus | 'all'),
    },
    {
      name: 'schoolId',
      label: 'رقم المدرسة',
      type: 'number',
      placeholder: 'مثال: 12',
      value: schoolIdFilter,
      onChange: onSchoolIdChange,
    },
    {
      name: 'planId',
      label: 'رقم الخطة',
      type: 'number',
      placeholder: 'مثال: 3',
      value: planIdFilter,
      onChange: onPlanIdChange,
    },
    {
      name: 'limit',
      label: 'عدد النتائج',
      type: 'select',
      placeholder: '10',
      options: LIMIT_OPTIONS,
      value: limitFilter,
      onChange: onLimitChange,
    },
  ];

  return (
    <GenericFilterPanel
      title="خيارات الفلترة والترتيب"
      fields={filterFields}
      sortBy={sortByFilter}
      onSortByChange={onSortByChange}
      sortByOptions={SORT_BY_OPTIONS}
      sortOrder={sortOrderFilter}
      onSortOrderChange={onSortOrderChange}
      hasActiveFilters={hasActiveFilters}
      onApply={onApply}
      onClear={onClear}
      onClose={onClose}
    />
  );
};

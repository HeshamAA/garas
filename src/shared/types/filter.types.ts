/**
 * Filter field configuration for generic filter panels
 */
export interface FilterField {
  /** Unique identifier for the field */
  name: string;
  /** Display label for the field */
  label: string;
  /** Type of input field */
  type: 'text' | 'number' | 'select';
  /** Placeholder text for the input */
  placeholder?: string;
  /** Options for select type fields */
  options?: Array<{ value: string; label: string }>;
  /** Current value of the field */
  value: string;
  /** Callback when field value changes */
  onChange: (value: string) => void;
}

/**
 * Props for the GenericFilterPanel component
 */
export interface GenericFilterPanelProps {
  /** Optional title for the filter panel */
  title?: string;
  /** Array of filter field configurations */
  fields: FilterField[];
  /** Current sort field value */
  sortBy: string;
  /** Callback when sort field changes */
  onSortByChange: (value: string) => void;
  /** Available sort options */
  sortByOptions: Array<{ value: string; label: string }>;
  /** Current sort order */
  sortOrder: 'ASC' | 'DESC';
  /** Callback when sort order changes */
  onSortOrderChange: (value: 'ASC' | 'DESC') => void;
  /** Whether there are active filters applied */
  hasActiveFilters: boolean;
  /** Callback when apply button is clicked */
  onApply: () => void;
  /** Callback when clear button is clicked */
  onClear: () => void;
  /** Callback when close button is clicked */
  onClose: () => void;
}

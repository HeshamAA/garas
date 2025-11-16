export interface BaseEntity {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BaseFilter {
  searchQuery?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  total?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

export interface GenericListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  isLoading?: boolean;
  emptyMessage?: string;
  emptyIcon?: React.ReactNode;
  className?: string;
}

export interface FilterOption {
  label: string;
  value: string;
  active: boolean;
  count?: number;
}

export type EntityStatus = 'active' | 'inactive' | 'pending' | 'approved' | 'rejected';

export type UserRole = 'owner' | 'school' | 'admin';

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface ActionState extends LoadingState {
  isSuccess: boolean;
}

export interface FieldError {
  field: string;
  message: string;
}

export interface GenericCardProps {
  title: string;
  subtitle?: string;
  avatar?: string;
  status?: EntityStatus;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  debounceMs?: number;
}

export interface StatusBadgeProps {
  status: EntityStatus;
  label?: string;
  className?: string;
}

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  protected?: boolean;
  requiredRole?: UserRole;
  children?: RouteConfig[];
}

export interface NavItem {
  name: string;
  path: string;
  icon?: React.ReactNode;
  badge?: number;
}

export interface DropdownOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastNotification {
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}
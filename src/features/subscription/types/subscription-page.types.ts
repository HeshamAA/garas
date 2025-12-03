import { SubscriptionStatus } from './subscription.types';

export interface StatusOption {
  label: string;
  value: SubscriptionStatus | 'all';
}

export const STATUS_OPTIONS: StatusOption[] = [
  { label: 'جميع الحالات', value: 'all' },
  { label: 'نشط', value: 'active' },
  { label: 'منتهي', value: 'expired' },
  { label: 'ملغي', value: 'cancelled' },
  { label: 'قيد الانتظار', value: 'pending' },
];

import type { LucideIcon } from 'lucide-react';
import type { SchoolStatistics } from '@/shared/types/statistics.types';
import type { PickupRequest } from '@/features/school/pickup-requests/types/request.types';

export interface StatCard {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export interface DashboardData {
  statistics: SchoolStatistics | null;
  recentRequests: PickupRequest[];
  loading: boolean;
  loadingRequests: boolean;
}

export interface UseDashboardDataReturn extends DashboardData {
  fetchStatistics: () => Promise<void>;
  fetchRecentRequests: () => Promise<void>;
}

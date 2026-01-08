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

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface DashboardData {
  statistics: SchoolStatistics | null;
  recentRequests: PickupRequest[];
  loading: boolean;
  loadingRequests: boolean;
  pagination: PaginationMeta | null;
}

export interface UseDashboardDataReturn extends DashboardData {
  fetchStatistics: () => Promise<void>;
  fetchRecentRequests: (page?: number) => Promise<void>;
}

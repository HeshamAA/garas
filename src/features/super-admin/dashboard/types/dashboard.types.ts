export interface SuperAdminStatistics {
  totalSchools: number;
  activeSchools: number;
  suspendedSchools?: number;
  pendingSchools: number;
  newThisWeek: number;
  newThisMonth: number;
  activatedToday: number;
  schoolsByRegion: SchoolByRegion[];
  recentSchools: RecentSchool[];
}

export interface SchoolByRegion {
  region: string;
  count: number;
}

export interface SchoolGrowthData {
  month: string;
  count: number;
}

export interface SchoolDistribution {
  region: string;
  count: number;
}

export interface RecentSchool {
  id: number;
  name: string;
  location: string;
  logo?: string;
  status: 'active' | 'pending' | 'suspended';
  createdAt: string;
}

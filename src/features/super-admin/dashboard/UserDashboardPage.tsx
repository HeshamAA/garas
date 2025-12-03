import { DashboardLayout } from '@/shared/components/layout';
import { Loader2 } from 'lucide-react';
import { useSuperAdminDashboard } from './hooks/useSuperAdminDashboard';
import { mapStatisticsToCards, mapStatisticsToAlerts } from './utils/statsMapper';
import { StatisticsGrid, AlertsSection, RecentSchoolsCard, RegionDistributionCard } from './components';

const UserDashboardPage = () => {
  const { statistics, loading } = useSuperAdminDashboard();

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  const stats = mapStatisticsToCards(statistics);
  const alerts = mapStatisticsToAlerts(statistics);
  const recentSchools = (statistics?.recentSchools || []).slice(0, 5);
  const regionDistribution = statistics?.schoolsByRegion || [];

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6 lg:space-y-8">
        <div className="animate-fade-in">
          <h1 className="text-2xl lg:text-3xl font-bold text-right">لوحة التحكم</h1>
          <p className="text-muted-foreground text-right mt-2">
            إدارة المدارس المسجلة في المنصة
          </p>
        </div>

        <StatisticsGrid stats={stats} />

        <AlertsSection alerts={alerts} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-zoom-in">
          <RecentSchoolsCard schools={recentSchools} />
          <RegionDistributionCard regions={regionDistribution} totalSchools={statistics?.totalSchools || 0} />
        </div>

      
      </div>
    </DashboardLayout>
  );
};

export default UserDashboardPage;

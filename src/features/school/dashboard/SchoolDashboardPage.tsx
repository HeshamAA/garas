import { useEffect } from 'react';
import { DashboardLayout } from '@/shared/components/layout';
import { useOneSignal } from '@/shared/hooks';
import { useDashboardData } from './hooks/useDashboardData';
import { mapStatisticsToCards } from './utils/statsMapper';
import { DashboardHeader } from './components/DashboardHeader';
import { StatisticsGrid } from './components/StatisticsGrid';
import { RecentRequestsCard } from './components/RecentRequestsCard';

const SchoolDashboardPage = () => {
  const { subscriptionId, isReady } = useOneSignal();
  const { statistics, recentRequests, loading, loadingRequests } = useDashboardData();
  console.log(recentRequests)
  useEffect(() => {
    if (isReady && subscriptionId) {
      console.log('OneSignal is ready! Subscription ID:', subscriptionId);
    }
  }, [isReady, subscriptionId]);

  const stats = mapStatisticsToCards(statistics);

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <DashboardHeader />
        <StatisticsGrid stats={stats} loading={loading} />
        <RecentRequestsCard requests={recentRequests} loading={loadingRequests} />
      </div>
    </DashboardLayout>
  );
};

export default SchoolDashboardPage;

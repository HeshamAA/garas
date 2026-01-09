import { useEffect, useCallback } from 'react';
import { DashboardLayout } from '@/shared/components/layout';
import { useOneSignal } from '@/shared/hooks';
import { usePusherRequests } from '@/shared/hooks/usePusherRequests';
import { useDashboardData } from './hooks/useDashboardData';
import { mapStatisticsToCards } from './utils/statsMapper';
import { DashboardHeader } from './components/DashboardHeader';
import { StatisticsGrid } from './components/StatisticsGrid';
import { RecentRequestsCard } from './components/RecentRequestsCard';

const SchoolDashboardPage = () => {
  const { subscriptionId, isReady } = useOneSignal();
  const { statistics, recentRequests, loading, loadingRequests, fetchStatistics, fetchRecentRequests } = useDashboardData();

  // Callback to refresh dashboard data on real-time updates
  const handleRequestChange = useCallback(() => {
    fetchStatistics();
    fetchRecentRequests();
  }, [fetchStatistics, fetchRecentRequests]);

  // Initialize Pusher for real-time updates
  usePusherRequests({
    onNewRequest: handleRequestChange,
    onRequestUpdated: handleRequestChange,
    onRequestCancelled: handleRequestChange,
  });

  useEffect(() => {
    if (isReady && subscriptionId) {
      // OneSignal ready
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

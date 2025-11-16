import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/shared/components/layout';
import { useAppSelector } from '@/shared/hooks';
import { useRequestActions } from '../hooks/useRequestActions';
import RequestFilters from '../components/RequestFilters';
import RequestList from '../components/RequestList';
import { RequestStatus } from '../types/request.types';
import { FileText, UserCheck, Users, TrendingUp } from 'lucide-react';
import { mockSchoolRequests } from '../data/mockSchoolRequests';

const SCHOOL_MENU_ITEMS = [
  { icon: TrendingUp, label: 'لوحة التحكم', path: '/school-dashboard' },
  { icon: FileText, label: 'طلبات الاستلام', path: '/receive-requests' },
  { icon: Users, label: 'أولياء الأمور', path: '/parents' },
  { icon: UserCheck, label: 'الطلاب', path: '/students' },
  { icon: Users, label: 'المستخدمون المسجلين', path: '/receivers' },
  { icon: UserCheck, label: 'المستخدمون المعتمدون', path: '/trusted-receivers' },
];

const ReceiveRequestsPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { approveRequest, rejectRequest, completeRequest, isUpdating } =
    useRequestActions();
  
  // Use mock data
  const requests = mockSchoolRequests;
  const isLoading = false;
  const error = null;

  const [activeFilter, setActiveFilter] = useState<RequestStatus | 'all'>('all');

  // Calculate status counts
  const statusCounts = useMemo(() => ({
    all: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    completed: requests.filter(r => r.status === 'completed').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
  }), [requests]);

  // Filter requests based on active filter
  const filteredRequests = useMemo(() => {
    if (activeFilter === 'all') return requests;
    return requests.filter(r => r.status === activeFilter);
  }, [requests, activeFilter]);

  const filterOptions = [
    { label: 'الكل', value: 'all' as const, active: activeFilter === 'all', count: statusCounts.all },
    {
      label: 'جديد',
      value: 'pending' as const,
      active: activeFilter === 'pending',
      count: statusCounts.pending,
    },
    {
      label: 'بانتظار الموافقة',
      value: 'approved' as const,
      active: activeFilter === 'approved',
      count: statusCounts.approved,
    },
    {
      label: 'تم التسليم',
      value: 'completed' as const,
      active: activeFilter === 'completed',
      count: statusCounts.completed,
    },
    {
      label: 'مرفوضة',
      value: 'rejected' as const,
      active: activeFilter === 'rejected',
      count: statusCounts.rejected,
    },
  ];

  const handleFilterChange = (value: RequestStatus | 'all') => {
    setActiveFilter(value);
  };

  const handleApprove = async (id: string) => {
    await approveRequest(id);
  };

  const handleReject = async (id: string) => {
    await rejectRequest(id);
  };

  const handleComplete = async (id: string) => {
    await completeRequest(id);
  };

  if (error) {
    return (
      <DashboardLayout
        menuItems={SCHOOL_MENU_ITEMS}
        userName={user?.school?.name || user?.name || 'المدرسة'}
        userAvatar={user?.avatar}
      >
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-destructive text-lg">{error}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      menuItems={SCHOOL_MENU_ITEMS}
      userName={user?.school?.name || user?.name || 'المدرسة'}
      userAvatar={user?.avatar}
    >
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h2 className="text-2xl lg:text-3xl font-bold text-right">طلبات الاستلام</h2>
          <p className="text-muted-foreground text-right mt-2">
            إدارة طلبات استلام الطلاب
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="animate-slide-in-right">
          <RequestFilters
            filters={filterOptions}
            onChange={handleFilterChange}
          />
        </div>

        {/* Requests List */}
        <div className="animate-zoom-in">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">جاري التحميل...</p>
            </div>
          ) : (
            <RequestList
              requests={filteredRequests}
              variant="school"
              onApprove={handleApprove}
              onReject={handleReject}
              onComplete={handleComplete}
              isLoading={isUpdating}
              emptyMessage="لا توجد طلبات استلام"
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReceiveRequestsPage;
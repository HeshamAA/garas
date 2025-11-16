import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/shared/components/layout';
import { useAppSelector } from '@/shared/hooks';
import ReceiverFilters from "../components/ReceiverFilters";
import ReceiverList from "../components/ReceiverList";
import { FileText, UserCheck, Users, TrendingUp } from 'lucide-react';
import { mockReceivers } from '../data/mockReceivers';

const SCHOOL_MENU_ITEMS = [
  { icon: TrendingUp, label: 'لوحة التحكم', path: '/school-dashboard' },
  { icon: FileText, label: 'طلبات الاستلام', path: '/receive-requests' },
  { icon: Users, label: 'أولياء الأمور', path: '/parents' },
  { icon: UserCheck, label: 'الطلاب', path: '/students' },
  { icon: Users, label: 'المستخدمون المسجلين', path: '/receivers' },
  { icon: UserCheck, label: 'المستخدمون المعتمدون', path: '/trusted-receivers' },
];

const ReceiversPage = () => {
  const { user } = useAppSelector(state => state.auth);
  
  // Use mock data
  const [allReceivers] = useState(mockReceivers);
  const [filters, setFilters] = useState<{ status: 'active' | 'inactive' | 'all' }>({ status: 'all' });
  const isLoading = false;
  const error = null;

  // Filter receivers based on status
  const receivers = useMemo(() => {
    if (filters.status === 'all') return allReceivers;
    return allReceivers.filter(r => r.status === filters.status);
  }, [allReceivers, filters.status]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handlePickupRequestsClick = (receiverId: string) => {
    console.log('View pickup requests for receiver:', receiverId);
  };

  return (
    <DashboardLayout
      menuItems={SCHOOL_MENU_ITEMS}
      userName={user?.school?.name || user?.name || 'المدرسة'}
      userAvatar={user?.avatar}
    >
      <div className="p-6 lg:p-8 space-y-6">
        <div className="animate-fade-in">
          <h2 className="text-2xl lg:text-3xl font-bold text-right">المستخدمون المسجلين</h2>
          <p className="text-muted-foreground text-right mt-2">
            إدارة المستخدمين المسجلين في النظام
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="animate-slide-in-right">
          <ReceiverFilters 
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg text-right">
            {error}
          </div>
        )}

        {/* Receivers List */}
        <div className="animate-zoom-in">
          <ReceiverList 
            receivers={receivers}
            isLoading={isLoading}
            emptyMessage="لا توجد مستلمون"
            onPickupRequestsClick={handlePickupRequestsClick}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReceiversPage;
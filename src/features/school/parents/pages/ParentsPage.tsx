import { useAppSelector } from '@/shared/hooks';
import { DashboardLayout } from '@/shared/components/layout';
import ParentList from '../components/ParentList';
import { FileText, UserCheck, Users, TrendingUp } from 'lucide-react';
import { mockParents } from '../data/mockParents';

const SCHOOL_MENU_ITEMS = [
  { icon: TrendingUp, label: 'لوحة التحكم', path: '/school-dashboard' },
  { icon: FileText, label: 'طلبات الاستلام', path: '/receive-requests' },
  { icon: Users, label: 'أولياء الأمور', path: '/parents' },
  { icon: UserCheck, label: 'الطلاب', path: '/students' },
  { icon: Users, label: 'المستخدمون المسجلين', path: '/receivers' },
  { icon: UserCheck, label: 'المستخدمون المعتمدون', path: '/trusted-receivers' },
];

const ParentsPage = () => {
  const { user } = useAppSelector(state => state.auth);
  
  // Use mock data
  const parents = mockParents;
  const isLoading = false;
  const error = null;

  const handleViewRequests = (parentId: string) => {
    console.log('View requests for parent:', parentId);
  };

  return (
    <DashboardLayout
      menuItems={SCHOOL_MENU_ITEMS}
      userName={user?.school?.name || user?.name || 'المدرسة'}
      userAvatar={user?.avatar}
    >
      <div className="p-6 lg:p-8 space-y-6">
        <div className="animate-fade-in">
          <h2 className="text-2xl lg:text-3xl font-bold text-right">أولياء الأمور</h2>
          <p className="text-muted-foreground text-right mt-2">
            إدارة أولياء الأمور المسجلين
          </p>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-right animate-slide-in-right">
            {error}
          </div>
        )}

        <div className="animate-zoom-in">
          <ParentList 
            parents={parents}
            isLoading={isLoading}
            onViewRequests={handleViewRequests}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ParentsPage;
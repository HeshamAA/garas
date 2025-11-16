import { DashboardLayout } from '@/shared/components/layout';
import { Input } from '@/components/ui/input';
import { Search, School, FileText, TrendingUp } from 'lucide-react';
import { useAppSelector } from '@/shared/hooks';
import { useRequestActions } from '../hooks/useRequestActions';
import RequestList from '../components/RequestList';
import { mockPickupRequests } from '../data/mockRequests';
import { useMemo } from 'react';

const USER_MENU_ITEMS = [
  { icon: TrendingUp, label: 'الإحصائيات', path: '/dashboard' },
  { icon: School, label: 'المدارس المسجلة', path: '/registered-schools' },
  { icon: FileText, label: 'الطلبات', path: '/requests' },
];

const RequestsPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { approveRequest, rejectRequest, isUpdating } = useRequestActions();
  
  // Use mock data directly
  const groupedRequests = useMemo(() => ({
    proposed: mockPickupRequests.filter((req) => req.type === 'proposed'),
    current: mockPickupRequests.filter((req) => req.type === 'current'),
    completed: mockPickupRequests.filter((req) => req.type === 'completed'),
  }), []);
  
  const isLoading = false;
  const error = null;

  const handleConfirm = async (id: string) => {
    await approveRequest(id);
  };

  const handleCancel = async (id: string) => {
    await rejectRequest(id);
  };

  if (error) {
    return (
      <DashboardLayout
        menuItems={USER_MENU_ITEMS}
        userName={user?.name || 'المستخدم'}
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
      menuItems={USER_MENU_ITEMS}
      userName={user?.name || 'المستخدم'}
      userAvatar={user?.avatar}
    >
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-2xl lg:text-3xl font-bold text-right">الطلبات</h1>
          <p className="text-muted-foreground text-right mt-2">
            إدارة طلبات الاستلام من المدارس
          </p>
        </div>

        {/* Search */}
        <div className="relative animate-slide-in-right">
          <Input
            placeholder="ابحث عن اسم المدرسة"
            className="w-full bg-card text-foreground border rounded-full h-12 pr-12 text-right placeholder:text-right"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        </div>

        {/* Requests Lists */}
        <div className="space-y-8 animate-zoom-in">
          {/* Proposed Requests */}
          {groupedRequests.proposed.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-right">طلبات تسجيل مدرسية مقترحة</h2>
              <RequestList
                requests={groupedRequests.proposed}
                variant="user"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                isLoading={isUpdating}
                emptyMessage="لا توجد طلبات مقترحة"
              />
            </div>
          )}

          {/* Current Requests */}
          {groupedRequests.current.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-right">طلبات جارية</h2>
              <RequestList
                requests={groupedRequests.current}
                variant="user"
                isLoading={isLoading}
                emptyMessage="لا توجد طلبات جارية"
              />
            </div>
          )}

          {/* Completed Requests */}
          {groupedRequests.completed.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-right">طلبات مكتملة</h2>
              <RequestList
                requests={groupedRequests.completed}
                variant="user"
                isLoading={isLoading}
                emptyMessage="لا توجد طلبات مكتملة"
              />
            </div>
          )}

          {/* Empty state */}
          {!isLoading &&
            groupedRequests.proposed.length === 0 &&
            groupedRequests.current.length === 0 &&
            groupedRequests.completed.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">لا توجد طلبات</p>
              </div>
            )}

          {/* Loading state */}
          {isLoading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">جاري التحميل...</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RequestsPage;
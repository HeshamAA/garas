import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/shared/components/layout';
import { Button } from "@/components/ui/button";
import { useAppSelector, useToast } from '@/shared/hooks';
import TrustedReceiverCard from "../components/TrustedReceiverCard";
import { FileText, UserCheck, Users, TrendingUp } from 'lucide-react';
import { mockTrustedReceivers } from '../data/mockReceivers';

const SCHOOL_MENU_ITEMS = [
  { icon: TrendingUp, label: 'لوحة التحكم', path: '/school-dashboard' },
  { icon: FileText, label: 'طلبات الاستلام', path: '/receive-requests' },
  { icon: Users, label: 'أولياء الأمور', path: '/parents' },
  { icon: UserCheck, label: 'الطلاب', path: '/students' },
  { icon: Users, label: 'المستخدمون المسجلين', path: '/receivers' },
  { icon: UserCheck, label: 'المستخدمون المعتمدون', path: '/trusted-receivers' },
];

const TrustedReceiversPage = () => {
  const { user } = useAppSelector(state => state.auth);
  const toast = useToast();
  
  // Use mock data
  const [allTrustedReceivers, setAllTrustedReceivers] = useState(mockTrustedReceivers);
  const [filters, setFilters] = useState<{ type: 'all' | 'student' | 'guardian' | 'receiver' }>({ type: 'all' });
  const isLoading = false;
  const error = null;
  const isUpdating = false;

  // Filter trusted receivers based on type
  const trustedReceivers = useMemo(() => {
    if (filters.type === 'all') return allTrustedReceivers;
    // For now, return all since we don't have type field in mock data
    return allTrustedReceivers;
  }, [allTrustedReceivers, filters.type]);

  const handleActivateTrustedReceiver = async (id: string) => {
    setAllTrustedReceivers(prev => prev.map(r => 
      r.id === id ? { ...r, status: 'active' as const } : r
    ));
    toast({
      title: 'تم التفعيل',
      description: 'تم تفعيل المستخدم المعتمد بنجاح',
    });
  };

  const handleDeactivateTrustedReceiver = async (id: string) => {
    setAllTrustedReceivers(prev => prev.map(r => 
      r.id === id ? { ...r, status: 'inactive' as const } : r
    ));
    toast({
      title: 'تم إلغاء التفعيل',
      description: 'تم إلغاء تفعيل المستخدم المعتمد بنجاح',
    });
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const filterOptions = [
    { label: "الكل", value: "all" as const },
    { label: "الطالب", value: "student" as const },
    { label: "ولي الامر", value: "guardian" as const },
    { label: "للمستلم", value: "receiver" as const },
  ];

  const handleFilterClick = (value: typeof filters.type) => {
    handleFilterChange({ ...filters, type: value });
  };

  if (isLoading) {
    return (
      <DashboardLayout
        menuItems={SCHOOL_MENU_ITEMS}
        userName={user?.school?.name || user?.name || 'المدرسة'}
        userAvatar={user?.avatar}
      >
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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
        <div className="animate-fade-in">
          <h2 className="text-2xl lg:text-3xl font-bold text-right">المستخدمون المعتمدون</h2>
          <p className="text-muted-foreground text-right mt-2">
            إدارة المستخدمين المعتمدين في النظام
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-3 justify-center flex-wrap animate-slide-in-right">
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant={filters.type === option.value ? "default" : "outline"}
              className="rounded-full px-6 lg:px-8 py-5 text-base"
              onClick={() => handleFilterClick(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg text-right">
            {error}
          </div>
        )}

        {/* Trusted Receivers List */}
        <div className="animate-zoom-in">
          {trustedReceivers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">لا توجد مستخدمين معتمدين</p>
            </div>
          ) : (
            <div className="space-y-4">
              {trustedReceivers.map((receiver) => (
                <TrustedReceiverCard
                  key={receiver.id}
                  receiver={receiver}
                  onActivate={handleActivateTrustedReceiver}
                  onDeactivate={handleDeactivateTrustedReceiver}
                  isUpdating={isUpdating}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TrustedReceiversPage;
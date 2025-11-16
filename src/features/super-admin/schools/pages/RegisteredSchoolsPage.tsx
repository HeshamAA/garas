import { DashboardLayout } from '@/shared/components/layout';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/shared/hooks';
import { SchoolList } from '../components/SchoolList';
import { useToast } from '@/shared/hooks';
import { mockSchools } from '../data/mockSchools';
import { School, FileText, TrendingUp } from 'lucide-react';

const USER_MENU_ITEMS = [
  { icon: TrendingUp, label: 'الإحصائيات', path: '/dashboard' },
  { icon: School, label: 'المدارس المسجلة', path: '/registered-schools' },
  { icon: FileText, label: 'الطلبات', path: '/requests' },
];

const RegisteredSchoolsPage = () => {
  const toast = useToast();
  const { user } = useAppSelector(state => state.auth);

  // Use mock data directly
  const schools = mockSchools;
  const isLoading = false;
  const error = null;

  const handleViewDetails = (schoolId: string) => {
    console.log('View details for school:', schoolId);
    toast({
      title: 'قريباً',
      description: 'سيتم إضافة صفحة تفاصيل المدرسة قريباً',
    });
  };

  const handleManageStudents = (schoolId: string) => {
    console.log('Manage students for school:', schoolId);
    toast({
      title: 'قريباً',
      description: 'سيتم إضافة إدارة الطلاب قريباً',
    });
  };

  const handleAddSchool = () => {
    toast({
      title: 'قريباً',
      description: 'سيتم إضافة نموذج تسجيل المدرسة قريباً',
    });
  };

  return (
    <DashboardLayout
      menuItems={USER_MENU_ITEMS}
      userName={user?.name || 'المستخدم'}
      userAvatar={user?.avatar}
    >
      <div className="p-6 lg:p-8 space-y-6">
        <div className="flex justify-between items-center animate-fade-in">
          <Button 
            className="rounded-full px-6 lg:px-8"
            onClick={handleAddSchool}
          >
            إضافة مدرسة جديدة
          </Button>
          <div className="text-right">
            <h2 className="text-2xl lg:text-3xl font-bold">المدارس المسجلة</h2>
            <p className="text-muted-foreground text-sm mt-1">
              إدارة المدارس المسجلة في المنصة
            </p>
          </div>
        </div>

        <div className="animate-slide-in-right">
          <SchoolList
            schools={schools}
            isLoading={isLoading}
            emptyMessage="لا توجد مدارس مسجلة"
            onViewDetails={handleViewDetails}
            onManageStudents={handleManageStudents}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RegisteredSchoolsPage;
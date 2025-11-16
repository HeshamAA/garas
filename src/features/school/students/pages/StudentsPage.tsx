import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/shared/components/layout';
import { StudentList } from '../components/StudentList';
import { StudentFilters } from '../components/StudentFilters';
import { useAppSelector, useToast } from '@/shared/hooks';
import { FileText, UserCheck, Users, TrendingUp } from 'lucide-react';
import { mockStudents } from '../data/mockStudents';
import { StudentStatus } from '../types/student.types';

const SCHOOL_MENU_ITEMS = [
  { icon: TrendingUp, label: 'لوحة التحكم', path: '/school-dashboard' },
  { icon: FileText, label: 'طلبات الاستلام', path: '/receive-requests' },
  { icon: Users, label: 'أولياء الأمور', path: '/parents' },
  { icon: UserCheck, label: 'الطلاب', path: '/students' },
  { icon: Users, label: 'المستخدمون المسجلين', path: '/receivers' },
  { icon: UserCheck, label: 'المستخدمون المعتمدون', path: '/trusted-receivers' },
];

const StudentsPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useAppSelector(state => state.auth);
  
  // Use mock data
  const [students, setStudents] = useState(mockStudents);
  const isLoading = false;
  const [activeFilter, setActiveFilter] = useState<StudentStatus | 'all'>('all');

  // Filter students based on active filter
  const filteredStudents = useMemo(() => {
    if (activeFilter === 'all') return students;
    return students.filter(s => s.status === activeFilter);
  }, [students, activeFilter]);
  const handleViewRequests = (studentId: string) => {
    navigate(`/students/${studentId}/requests`);
  };
  
  const handleStatusUpdate = async (studentId: string, status: StudentStatus) => {
    // Update student status in mock data
    setStudents(prev => prev.map(s => 
      s.id === studentId ? { ...s, status } : s
    ));
    
    toast({
      title: 'تم التحديث',
      description: 'تم تحديث حالة الطالب بنجاح',
    });
  };

  return (
    <DashboardLayout
      menuItems={SCHOOL_MENU_ITEMS}
      userName={user?.school?.name || user?.name || 'المدرسة'}
      userAvatar={user?.avatar}
    >
      <div className="p-6 lg:p-8 space-y-6">
        <div className="animate-fade-in">
          <h2 className="text-2xl lg:text-3xl font-bold text-right">الطلاب</h2>
          <p className="text-muted-foreground text-right mt-2">
            إدارة الطلاب المسجلين
          </p>
        </div>

        {/* Filters */}
        <div className="animate-slide-in-right">
          <StudentFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {/* Students list */}
        <div className="animate-zoom-in">
          <StudentList
            students={filteredStudents}
            isLoading={isLoading}
            emptyMessage="لا توجد طلاب"
            onViewRequests={handleViewRequests}
            onStatusUpdate={handleStatusUpdate}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentsPage;
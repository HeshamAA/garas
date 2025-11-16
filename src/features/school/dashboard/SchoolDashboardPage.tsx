import { DashboardLayout } from '@/shared/components/layout';
import { useAppSelector } from '@/shared/hooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const SCHOOL_MENU_ITEMS = [
  { icon: AlertCircle, label: 'لوحة التحكم', path: '/school-dashboard' },
  { icon: Clock, label: 'طلبات الاستلام', path: '/receive-requests' },
  { icon: Users, label: 'أولياء الأمور', path: '/parents' },
  { icon: UserCheck, label: 'الطلاب', path: '/students' },
  { icon: Users, label: 'المستخدمون المسجلين', path: '/receivers' },
  { icon: CheckCircle, label: 'المستخدمون المعتمدون', path: '/trusted-receivers' },
];

const SchoolDashboardPage = () => {
  const { user } = useAppSelector((state) => state.auth);

  const stats = [
    {
      title: 'إجمالي الطلاب',
      value: '156',
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'أولياء الأمور',
      value: '142',
      icon: UserCheck,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'طلبات اليوم',
      value: '23',
      icon: Clock,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      title: 'تم الاستلام',
      value: '18',
      icon: CheckCircle,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
  ];

  const recentRequests = [
    { id: 1, student: 'أحمد محمد', parent: 'محمد أحمد', status: 'pending', time: '10:30 ص' },
    { id: 2, student: 'فاطمة علي', parent: 'علي حسن', status: 'approved', time: '10:45 ص' },
    { id: 3, student: 'خالد سعيد', parent: 'سعيد خالد', status: 'completed', time: '11:00 ص' },
    { id: 4, student: 'نورة عبدالله', parent: 'عبدالله محمد', status: 'pending', time: '11:15 ص' },
    { id: 5, student: 'عمر يوسف', parent: 'يوسف عمر', status: 'approved', time: '11:30 ص' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">قيد الانتظار</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">تمت الموافقة</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">مكتمل</Badge>;
      default:
        return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  return (
    <DashboardLayout
      menuItems={SCHOOL_MENU_ITEMS}
      userName={user?.school?.name || user?.name || 'المدرسة'}
      userAvatar={user?.avatar}
    >
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-right">لوحة التحكم</h1>
          <p className="text-muted-foreground text-right mt-2">
            مرحباً بك في لوحة التحكم الخاصة بالمدرسة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-right">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-right">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-right">طلبات الاستلام الأخيرة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{request.time}</span>
                    {getStatusBadge(request.status)}
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{request.student}</p>
                    <p className="text-sm text-muted-foreground">ولي الأمر: {request.parent}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

       
      </div>
    </DashboardLayout>
  );
};

export default SchoolDashboardPage;

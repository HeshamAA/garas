import { DashboardLayout } from '@/shared/components/layout';
import { useAppSelector } from '@/shared/hooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { School, FileText, TrendingUp } from 'lucide-react';

const USER_MENU_ITEMS = [
  { icon: TrendingUp, label: 'الإحصائيات', path: '/dashboard' },
  { icon: School, label: 'المدارس المسجلة', path: '/registered-schools' },
  { icon: FileText, label: 'الطلبات', path: '/requests' },
];

const UserDashboardPage = () => {
  const { user } = useAppSelector((state) => state.auth);

  const stats = [
    {
      title: 'إجمالي المدارس',
      value: '24',
      icon: School,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'الطلبات النشطة',
      value: '12',
      icon: FileText,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      title: 'الطلبات المكتملة',
      value: '156',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    },
    {
      title: 'الطلبات الملغاة',
      value: '8',
      icon: FileText,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
    },
  ];

  return (
    <DashboardLayout
      menuItems={USER_MENU_ITEMS}
      userName={user?.name || 'المستخدم'}
      userAvatar={user?.avatar}
    >
      <div className="p-6 lg:p-8 space-y-6 lg:space-y-8">
        <div className="animate-fade-in">
          <h1 className="text-2xl lg:text-3xl font-bold text-right">الإحصائيات</h1>
          <p className="text-muted-foreground text-right mt-2">
            نظرة عامة على نشاط المنصة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 animate-slide-in-right">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={stat.title}
                className="hover:shadow-lg transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-right">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2.5 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl lg:text-3xl font-bold text-right">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 animate-zoom-in">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-right flex items-center justify-end gap-2">
                <span>آخر الطلبات</span>
                <FileText className="w-5 h-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { id: 1, school: 'مدرسة النور الأهلية', status: 'نشط', statusColor: 'success' },
                  { id: 2, school: 'مدرسة الأمل الدولية', status: 'قيد المراجعة', statusColor: 'warning' },
                  { id: 3, school: 'مدرسة المستقبل', status: 'مكتمل', statusColor: 'primary' },
                ].map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center justify-between p-3 lg:p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <div className="text-right flex-1">
                      <p className="font-medium text-sm lg:text-base">طلب استلام #{item.id}</p>
                      <p className="text-xs lg:text-sm text-muted-foreground">{item.school}</p>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full bg-${item.statusColor}/10 text-${item.statusColor}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-right flex items-center justify-end gap-2">
                <span>المدارس الأكثر نشاطاً</span>
                <School className="w-5 h-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'مدرسة النور الأهلية', students: 47, requests: 120 },
                  { name: 'مدرسة الأمل الدولية', students: 38, requests: 110 },
                  { name: 'مدرسة المستقبل', students: 52, requests: 100 },
                ].map((school, i) => (
                  <div 
                    key={i} 
                    className="flex items-center justify-between p-3 lg:p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <div className="text-right flex-1">
                      <p className="font-medium text-sm lg:text-base">{school.name}</p>
                      <p className="text-xs lg:text-sm text-muted-foreground">{school.students} طالب</p>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-primary">{school.requests} طلب</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboardPage;

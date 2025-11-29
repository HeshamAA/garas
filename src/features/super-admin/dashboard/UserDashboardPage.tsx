import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/shared/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { School, CheckCircle, Clock, TrendingUp, AlertCircle, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { superAdminDashboardApi, SuperAdminStatistics } from './api/dashboardApi';
import { useToast } from '@/hooks/use-toast';

const UserDashboardPage = () => {
  const [statistics, setStatistics] = useState<SuperAdminStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    setLoading(true);
    try {
      const response = await superAdminDashboardApi.getStatistics();
      setStatistics(response.data);
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل في تحميل الإحصائيات',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  const stats = statistics ? [
    {
      title: 'إجمالي المدارس',
      value: statistics.totalSchools.toString(),
      icon: School,
      color: 'text-blue-600',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'المدارس النشطة',
      value: statistics.activeSchools.toString(),
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-500/10',
    },
    ...(statistics.suspendedSchools !== undefined ? [{
      title: 'مدارس محظورة',
      value: statistics.suspendedSchools.toString(),
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-500/10',
    }] : []),
    {
      title: 'مدارس معلقة',
      value: statistics.pendingSchools.toString(),
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-500/10',
    },
    {
      title: 'جديدة هذا الأسبوع',
      value: statistics.newThisWeek.toString(),
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'جديدة هذا الشهر',
      value: statistics.newThisMonth.toString(),
      icon: TrendingUp,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-500/10',
    },
  ] : [];

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
      return `منذ ${diffInMinutes} دقيقة`;
    } else if (diffInHours < 24) {
      return `منذ ${diffInHours} ساعة`;
    } else if (diffInDays === 1) {
      return 'أمس';
    } else if (diffInDays < 7) {
      return `منذ ${diffInDays} أيام`;
    } else {
      return date.toLocaleDateString('ar-SA');
    }
  };

  const recentSchools = statistics?.recentSchools || [];
  const regionDistribution = statistics?.schoolsByRegion || [];

  const alerts = statistics ? [
    ...(statistics.pendingSchools > 0 ? [{ type: 'warning' as const, message: `${statistics.pendingSchools} مدارس في انتظار الموافقة` }] : []),
    ...(statistics.activatedToday > 0 ? [{ type: 'info' as const, message: `تم تفعيل ${statistics.activatedToday} مدارس جديدة اليوم` }] : []),
  ] : [];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20">نشطة</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20">معلقة</Badge>;
      case 'suspended':
        return <Badge className="bg-red-500/10 text-red-700 hover:bg-red-500/20">محظورة</Badge>;
      default:
        return <Badge>غير معروف</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6 lg:space-y-8">
        <div className="animate-fade-in">
          <h1 className="text-2xl lg:text-3xl font-bold text-right">لوحة التحكم</h1>
          <p className="text-muted-foreground text-right mt-2">
            إدارة المدارس المسجلة في المنصة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 animate-slide-in-right">
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

        {alerts.length > 0 && (
          <div className="space-y-2 animate-slide-in-right">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-4 rounded-lg ${
                  alert.type === 'warning'
                    ? 'bg-yellow-500/10 border border-yellow-500/20'
                    : 'bg-blue-500/10 border border-blue-500/20'
                }`}
              >
                <AlertCircle
                  className={`w-5 h-5 ${
                    alert.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                  }`}
                />
                <p className="text-sm font-medium text-right flex-1">{alert.message}</p>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-zoom-in">
          
          <Card>
            <CardHeader>
              <CardTitle className="text-right flex items-center justify-between">
                <span>المدارس المضافة مؤخراً</span>
                <School className="w-5 h-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentSchools.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  لا توجد مدارس مضافة مؤخراً
                </div>
              ) : (
                <div className="space-y-3">
                  {recentSchools.map((school) => (
                    <div
                      key={school.id}
                      className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        {school.logo && (
                          <img 
                            src={school.logo} 
                            alt={school.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        )}
                        <div className="text-right flex-1">
                          <p className="font-medium text-sm">{school.name}</p>
                          <p className="text-xs text-muted-foreground">{school.location}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {getRelativeTime(school.createdAt)}
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(school.status)}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-right flex items-center justify-between">
                <span>توزيع المدارس حسب المنطقة</span>
                <TrendingUp className="w-5 h-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              {regionDistribution.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  لا توجد بيانات لتوزيع المدارس
                </div>
              ) : (
                <div className="space-y-3">
                  {regionDistribution.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{item.count} مدرسة</span>
                        <span className="text-muted-foreground">{item.region}</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary rounded-full h-2 transition-all"
                          style={{ width: `${statistics ? (item.count / statistics.totalSchools) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      
      </div>
    </DashboardLayout>
  );
};

export default UserDashboardPage;

import { DashboardLayout } from '@/shared/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, Clock, CheckCircle, Loader2, Truck, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import { statisticsApi } from '@/shared/api';
import { SchoolStatistics } from '@/shared/types/statistics.types';
import { useToast } from '@/hooks/use-toast';
import { requestsApi } from '@/features/school/pickup-requests/api/requestsApi';
import { PickupRequest } from '@/features/school/pickup-requests/types/request.types';
import { EmptyState } from '@/shared/components/EmptyState';
import { useOneSignal } from '@/shared/hooks';

const SchoolDashboardPage = () => {
  const [statistics, setStatistics] = useState<SchoolStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentRequests, setRecentRequests] = useState<PickupRequest[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const { toast } = useToast();
  const { subscriptionId, isReady } = useOneSignal();

  // عرض الـ subscription ID في الـ console
  useEffect(() => {
    if (isReady && subscriptionId) {
      console.log('OneSignal is ready! Subscription ID:', subscriptionId);
      // هنا ممكن تبعت الـ subscriptionId للـ backend
    }
  }, [isReady, subscriptionId]);

  useEffect(() => {
    fetchStatistics();
    fetchRecentRequests();
  }, []);

  const fetchStatistics = async () => {
    setLoading(true);
    try {
      const response = await statisticsApi.getSchoolStatistics();
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

  const fetchRecentRequests = async () => {
    setLoadingRequests(true);
    try {
      const response = await requestsApi.getSchoolRequests({
        limit: 5,
        page: 1,
        sortBy: 'date',
        sortOrder: 'DESC',
      });
      console.log('Recent requests response:', response);
      console.log('Recent requests items:', response.data?.items);
      setRecentRequests(response.data?.items || []);
    } catch (error) {
      console.error('Failed to fetch recent requests:', error);
    } finally {
      setLoadingRequests(false);
    }
  };

  const stats = statistics ? [
    {
      title: 'إجمالي الطلاب',
      value: statistics.totalStudents.toString(),
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'أولياء الأمور',
      value: statistics.totalParents.toString(),
      icon: UserCheck,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'مستلمين',
      value: statistics.totalDeliveryPersons.toString(),
      icon: Truck,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'إجمالي الطلبات',
      value: statistics.totalRequests.toString(),
      icon: Clock,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      title: 'طلبات معلقة',
      value: statistics.pendingRequestsToday.toString(),
      icon: Clock,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
    },
    {
      title: 'تم التسليم اليوم',
      value: statistics.deliveredRequestsToday.toString(),
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'بانتظار الاستلام',
      value: statistics.waitingOutsideRequestsToday.toString(),
      icon: Clock,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'ملغاة اليوم',
      value: statistics.cancelledRequestsToday.toString(),
      icon: XCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
    },
  ] : [];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">قيد الانتظار</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">تمت الموافقة</Badge>;
      case 'completed':
      case 'delivered':
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">مكتمل</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">مرفوض</Badge>;
      default:
        return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ar-EG', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-right">لوحة التحكم</h1>
          <p className="text-muted-foreground text-right mt-2">
            مرحباً بك في لوحة التحكم الخاصة بالمدرسة
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
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
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-right">طلبات الاستلام الأخيرة</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingRequests ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : recentRequests.length > 0 ? (
              <div className="space-y-3">
                {recentRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                        <div className="text-right">
                      <p className="font-medium">{request.student?.fullName || 'غير محدد'}</p>
                      <p className="text-sm text-muted-foreground">
                        ولي الأمر: {request.parent?.fullName || request.student?.parent?.fullName || 'غير محدد'}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">{formatTime(request.date)}</span>
                      {getStatusBadge(request.status)}
                    </div>
                
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState 
                message="لا توجد طلبات استلام" 
                description="لم يتم تسجيل أي طلبات استلام حتى الآن."
              />
            )}
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  );
};

export default SchoolDashboardPage;

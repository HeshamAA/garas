import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/shared/components/layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, MapPin, User, Clock, Phone, Mail, Car, Loader2 } from 'lucide-react';
import { requestsApi } from '../api/requestsApi';
import RequestStatusBadge from '../components/RequestStatusBadge';
import { useToast } from '@/hooks/use-toast';

const RequestDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [request, setRequest] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchRequestDetails();
    }
  }, [id]);

  const fetchRequestDetails = async () => {
    setLoading(true);
    try {
      const response = await requestsApi.getRequestById(id!);
      setRequest(response.data);
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل في تحميل تفاصيل الطلب',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getHowToReceiveLabel = (how: string) => {
    switch (how) {
      case 'person':
        return 'شخصياً';
      case 'car':
        return 'بالسيارة';
      default:
        return 'أخرى';
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

  if (!request) {
    return (
      <DashboardLayout>
        <div className="p-8 text-center">
          <p className="text-lg text-muted-foreground">لم يتم العثور على الطلب</p>
          <Button onClick={() => navigate('/receive-requests')} className="mt-4">
            العودة للطلبات
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6" dir="rtl">
        
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate('/receive-requests')}
            className="gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            العودة للطلبات
          </Button>
          <div className="text-right">
            <h1 className="text-2xl lg:text-3xl font-bold">تفاصيل الطلب</h1>
            <p className="text-muted-foreground mt-1">رقم الطلب: #{request.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 space-y-6">
            
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">حالة الطلب</h2>
                <RequestStatusBadge status={request.status} showIcon />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">تاريخ الإنشاء</p>
                  <p className="font-medium">{formatDate(request.createdAt)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">آخر تحديث</p>
                  <p className="font-medium">{formatDate(request.updatedAt)}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">تفاصيل الطلب</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">موعد الاستلام</p>
                    <p className="font-medium">{formatDate(request.date)} - {formatTime(request.date)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">الموقع</p>
                    <p className="font-medium">{request.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">طريقة الاستلام</p>
                    <p className="font-medium">{getHowToReceiveLabel(request.howToReceive)}</p>
                  </div>
                </div>

                {request.numberOfCar && (
                  <div className="flex items-start gap-3">
                    <Car className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">رقم السيارة</p>
                      <p className="font-medium">{request.numberOfCar}</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            
            {request.student && (
              <Card className="p-6">
                <h3 className="font-bold mb-4">معلومات الطالب</h3>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={request.student.profileImage} loading="lazy" />
                    <AvatarFallback>
                      {request.student.fullName?.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-right">
                    <p className="font-medium">{request.student.fullName}</p>
                    <p className="text-sm text-muted-foreground">
                      {typeof request.student.class === 'object' 
                        ? (request.student.class as any)?.name || 'غير محدد' 
                        : request.student.class}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {request.student?.parent && (
              <Card className="p-6">
                <h3 className="font-bold mb-4">معلومات ولي الأمر</h3>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={request.student.parent.profileImage} loading="lazy" />
                    <AvatarFallback>
                      {request.student.parent.fullName?.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-right flex-1">
                    <p className="font-medium">{request.student.parent.fullName}</p>
                    <p className="text-sm text-muted-foreground">ولي أمر</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  {request.student.parent.user?.phoneNumber && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{request.student.parent.user.phoneNumber}</span>
                    </div>
                  )}
                  {request.student.parent.user?.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs">{request.student.parent.user.email}</span>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {request.deliveryPerson && (
              <Card className="p-6">
                <h3 className="font-bold mb-4">معلومات المستلم</h3>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={request.deliveryPerson.profileImage} loading="lazy" />
                    <AvatarFallback>
                      {request.deliveryPerson.fullName?.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-right flex-1">
                    <p className="font-medium">{request.deliveryPerson.fullName}</p>
                    <p className="text-sm text-muted-foreground">مستلم</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  {request.deliveryPerson.user?.phoneNumber && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{request.deliveryPerson.user.phoneNumber}</span>
                    </div>
                  )}
                  {request.deliveryPerson.nationalId && (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span>الرقم القومي: {request.deliveryPerson.nationalId}</span>
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RequestDetailsPage;

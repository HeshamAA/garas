import { DashboardLayout } from '@/shared/components/layout';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useRequestDetails } from '../hooks/useRequestDetails';
import { formatDate, formatTime, getHowToReceiveLabel } from '../utils/formatters';
import { RequestDetailsHeader } from '../components/RequestDetailsHeader';
import { RequestStatusCard } from '../components/RequestStatusCard';
import { RequestDetailsCard } from '../components/RequestDetailsCard';
import { PersonInfoCard } from '../components/PersonInfoCard';

const RequestDetailsPage = () => {
  const { request, loading, handleBack } = useRequestDetails();

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
          <Button onClick={handleBack} className="mt-4">
            العودة للطلبات
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const studentClass =
    typeof request.student.class === 'object'
      ? ((request.student.class as { name?: string })?.name || 'غير محدد')
      : request.student.class;

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6" dir="rtl">
        <RequestDetailsHeader requestId={request.id} onBack={handleBack} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <RequestStatusCard
              status={request.status}
             
            />

            <RequestDetailsCard
              date={request.date}
              location={request.location}
              howToReceive={request.howToReceive}
              numberOfCar={request.numberOfCar}
              formatDate={formatDate}
              formatTime={formatTime}
              getHowToReceiveLabel={getHowToReceiveLabel}
            />
          </div>

          <div className="space-y-6">
            {request.student && (
              <PersonInfoCard
                title="معلومات الطالب"
                fullName={request.student.fullName}
                profileImage={request.student.profileImage}
                role={studentClass}
              />
            )}

            {request.student?.parent && (
              <PersonInfoCard
                title="معلومات ولي الأمر"
                fullName={request.student.parent.fullName}
                profileImage={request.student.parent.profileImage}
                role="ولي أمر"
                phoneNumber={request.student.parent.user?.phoneNumber}
                email={request.student.parent.user?.email}
              />
            )}

            {request.deliveryPerson && (
              <PersonInfoCard
                title="معلومات المستلم"
                fullName={request.deliveryPerson.fullName}
                profileImage={request.deliveryPerson.profileImage}
                role="مستلم"
                phoneNumber={request.deliveryPerson.user?.phoneNumber}
                nationalId={request.deliveryPerson.nationalId}
              />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RequestDetailsPage;

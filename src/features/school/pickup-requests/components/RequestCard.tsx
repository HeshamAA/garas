import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, User, Clock, Bell } from 'lucide-react';
import { PickupRequest } from '../types/request.types';
import RequestStatusBadge from './RequestStatusBadge';

interface RequestCardProps {
  request: PickupRequest ;
  variant?: 'user' | 'school';
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
  onComplete?: (id: number) => void;
  onCancel?: (id: number) => void;
  onConfirm?: (id: number) => void;
  isLoading?: boolean;
  className?: string;
}

const RequestCard = ({
  request,

  className = '',
}: RequestCardProps) => {

  console.log(request)
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
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


  return (
    <Card className={`rounded-2xl p-6 shadow-sm border border-border/50 ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12">
            {/* <AvatarImage src={request.student.parent?.profileImage || undefined} /> */}
            <AvatarFallback>
              {request.student.parent?.fullName?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'P'}
            </AvatarFallback>
          </Avatar>
          <div className="text-right">
            <h3 className="text-lg font-bold">{request.student.parent?.fullName || 'غير محدد'}</h3>
            <p className="text-sm text-muted-foreground">ولي أمر</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <RequestStatusBadge status={request.status} />
        </div>
      </div>

      {/* Details Grid */}
      <div className="space-y-3 mb-4 text-right">
             {request.student && (
          <div className="flex items-center text-sm gap-2">
            <span className="font-medium flex items-center gap-2">
              <User className="w-4 h-4" />
              الطالب:
            </span>
            <span className="text-primary">
              {request.student.fullName} - {typeof request.student.class === 'object' ? (request.student.class as any)?.name || 'غير محدد' : request.student.class}
            </span>
          </div>
        )}

        <div className="flex items-center text-sm gap-2">
          <span className="font-medium flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            الموقع:
          </span>
          <span className="text-primary">
            {request.location}
          </span>
        </div>

        <div className="flex items-center text-sm gap-2">
          <span className="font-medium flex items-center gap-2">
            <Clock className="w-4 h-4" />
            التاريخ:
          </span>
          <span className="text-primary">
            {formatDate(request.date)} - {formatTime(request.date)}
          </span>
        </div>

        <div className="flex items-center text-sm gap-2">
          <span className="font-medium">طريقة الاستلام:</span>
          <span className="text-primary">{getHowToReceiveLabel(request.howToReceive)}</span>
        </div>

        {request.numberOfCar && (
          <div className="flex items-center text-sm gap-2">
            <span className="font-medium">رقم السيارة:</span>
            <span className="text-primary">{request.numberOfCar}</span>
          </div>
        )}
  
        {request.deliveryPerson && (
          <div className="space-y-2 p-3 bg-primary/5 rounded-lg mt-2">
            <p className="font-medium text-sm">معلومات المستلم:</p>
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={request.deliveryPerson.profileImage || undefined} />
                <AvatarFallback>
                  {request.deliveryPerson.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="text-right flex-1">
                <p className="font-medium text-sm">{request.deliveryPerson.fullName}</p>
                <p className="text-xs text-muted-foreground">{request.deliveryPerson.user.phoneNumber}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {/* <RequestActions
        requestId={request.id}
        status={request.status}
        onApprove={onApprove}
        onReject={onReject}
        onComplete={onComplete}
        isLoading={isLoading}
      /> */}
    </Card>
  );
};

export default RequestCard;
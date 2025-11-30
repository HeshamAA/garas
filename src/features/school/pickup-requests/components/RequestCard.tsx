import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, User, Clock } from 'lucide-react';
import { memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PickupRequest } from '../types/request.types';
import RequestStatusBadge from './RequestStatusBadge';

interface RequestCardProps {
  request: PickupRequest;
  variant?: 'user' | 'school';
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
  onComplete?: (id: number) => void;
  onCancel?: (id: number) => void;
  onConfirm?: (id: number) => void;
  isLoading?: boolean;
  className?: string;
}

const RequestCard = memo(({
  request,
  className = '',
}: RequestCardProps) => {
  const navigate = useNavigate();
  const formattedDate = useMemo(() => {
    return new Date(request.date).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }, [request.date]);
  
  const formattedTime = useMemo(() => {
    return new Date(request.date).toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }, [request.date]);

  const howToReceiveLabel = useMemo(() => {
    if (!request.howToReceive) return 'غير محدد';
    switch (request.howToReceive) {
      case 'person':
        return 'شخصياً';
      case 'car':
        return 'بالسيارة';
      default:
        return 'أخرى';
    }
  }, [request.howToReceive]);

  const parentInitials = useMemo(() => {
    return request.student.parent?.fullName?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'P';
  }, [request.student.parent?.fullName]);

  const deliveryPersonInitials = useMemo(() => {
    return request.deliveryPerson?.fullName.split(' ').map(n => n[0]).join('').slice(0, 2) || 'D';
  }, [request.deliveryPerson?.fullName]);

  const handleCardClick = () => {
    navigate(`/receive-requests/${request.id}`);
  };

  return (
    <Card 
      className={` flex flex-col rounded-2xl p-6 shadow-sm border border-border/50 hover:shadow-lg transition-shadow cursor-pointer ${className}`}
      onClick={handleCardClick}
    >
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={request.student.parent?.profileImage || undefined} loading="lazy" />
            <AvatarFallback>
              {parentInitials}
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

      <div className="space-y-3 mb-4 text-right h-full max-h-full flex flex-col justify-around">
             {request.student && (
          <div className="flex items-center text-sm gap-2">
            <span className="font-medium flex items-center gap-2">
              <User className="w-4 h-4" />
              الطالب:
            </span>
            <span className="text-primary">
              {request.student.fullName} - {typeof request.student.class === 'object' ? (request.student.class)?.name || 'غير محدد' : request.student.class}
            </span>
          </div>
        )}

        <div className="flex items-center text-sm gap-2">
          <span className="font-medium flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            الموقع:
          </span>
          <span className="text-primary">
            {request.location || 'غير محدد'}
          </span>
        </div>

        <div className="flex items-center text-sm gap-2">
          <span className="font-medium flex items-center gap-2">
            <Clock className="w-4 h-4" />
            التاريخ:
          </span>
          <span className="text-primary">
            {formattedDate} - {formattedTime}
          </span>
        </div>

        <div className="flex items-center text-sm gap-2">
          <span className="font-medium">طريقة الاستلام:</span>
          <span className="text-primary">{howToReceiveLabel}</span>
        </div>

        {request.howToReceive === 'car' && (
          <div className="flex items-center text-sm gap-2 flex-wrap">
            <span className="font-medium">تفاصيل السيارة:</span>
            <span className="text-primary">
              رقم السيارة: {request.numberOfCar || 'غير محدد'} | نوع السيارة: {request.carType || 'غير محدد'} | لون السيارة: {request.carColor || 'غير محدد'}
            </span>
          </div>
        )}
  
        <div className="space-y-2 p-3 bg-primary/5 rounded-lg mt-2">
          <p className="font-medium text-sm">معلومات المستلم:</p>
          {request.deliveryPerson ? (
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={request.deliveryPerson.profileImage || undefined} loading="lazy" />
                <AvatarFallback>
                  {deliveryPersonInitials}
                </AvatarFallback>
              </Avatar>
              <div className="text-right flex-1">
                <p className="font-medium text-sm">{request.deliveryPerson.fullName}</p>
                <p className="text-xs text-muted-foreground">{request.deliveryPerson.user?.phoneNumber || 'غير محدد'}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">غير محدد</p>
          )}
        </div>
      </div>

    </Card>
  );
});

RequestCard.displayName = 'RequestCard';

export default RequestCard;
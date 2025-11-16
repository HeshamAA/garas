import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, User, Clock, Bell } from 'lucide-react';
import { PickupRequest, SchoolRequest } from '../types/request.types';
import RequestStatusBadge from './RequestStatusBadge';
import RequestActions from './RequestActions';

interface RequestCardProps {
  request: PickupRequest | SchoolRequest;
  variant?: 'user' | 'school';
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onComplete?: (id: string) => void;
  onCancel?: (id: string) => void;
  onConfirm?: (id: string) => void;
  isLoading?: boolean;
  className?: string;
}

const RequestCard = ({
  request,
  variant = 'user',
  onApprove,
  onReject,
  onComplete,
  onCancel,
  onConfirm,
  isLoading = false,
  className = '',
}: RequestCardProps) => {
  const isSchoolRequest = 'schoolName' in request;
  const schoolRequest = isSchoolRequest ? (request as SchoolRequest) : null;
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };
  const formatTime = (date?: Date) => {
    if (!date) return '';
    return new Date(date).toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (variant === 'user') {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-1 text-right space-y-3">
            <div className="flex items-center justify-end gap-3">
              <div>
                <h3 className="font-bold text-lg">
                  {schoolRequest?.schoolName || request.studentName}
                </h3>
                <p className="text-sm text-primary">
                  {schoolRequest?.schoolLocation || request.location}
                </p>
              </div>
              <div className="bg-primary/10 p-3 rounded-xl">
                <Bell className="w-8 h-8 text-primary" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2 text-right text-sm mb-6">
          <div className="flex justify-between">
            <span className="text-muted-foreground">{formatDate(request.requestDate)}</span>
            <span className="font-medium">تاريخ الطلب</span>
          </div>
          {schoolRequest && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">{schoolRequest.transportType}</span>
              <span className="font-medium">نوع التوصيل</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">{request.requestNumber}</span>
            <span className="font-medium">رقم الطلب</span>
          </div>
          <div className="flex justify-between">
            <RequestStatusBadge status={request.status} />
            <span className="font-medium">حالة الطلب</span>
          </div>
        </div>

        {request.type === 'proposed' && onConfirm && onCancel && (
          <RequestActions
            requestId={request.id}
            status={request.status}
            onConfirm={onConfirm}
            onCancel={onCancel}
            isLoading={isLoading}
          />
        )}
      </Card>
    );
  }
  return (
    <Card className={`rounded-2xl p-6 shadow-sm border border-border/50 ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <RequestStatusBadge status={request.status} />
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <h3 className="text-lg font-bold">{request.parentName}</h3>
            <p className="text-sm text-muted-foreground">ولي امر</p>
          </div>
          <Avatar className="w-12 h-12">
            <AvatarImage src={request.studentAvatar} />
            <AvatarFallback>
              {request.parentName.split(' ')[0]?.charAt(0) || 'P'}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Details Grid */}
      <div className="space-y-3 mb-4 text-right">
        <div className="flex justify-between items-center text-sm">
          <span className="text-primary flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {request.location}
          </span>
          <span className="font-medium flex items-center gap-2">
            <span>📍</span>
            الموقع:
          </span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-primary flex items-center gap-2">
            <User className="w-4 h-4" />
            {request.receiverName}
          </span>
          <span className="font-medium flex items-center gap-2">
            <span className="text-primary">⚫</span>
            المستلم:
          </span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-primary flex items-center gap-2">
            <User className="w-4 h-4" />
            {request.studentName}
          </span>
          <span className="font-medium flex items-center gap-2">
            <span>👤</span>
            الطالب:
          </span>
        </div>

        {request.pickupTime && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-primary flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {formatTime(request.pickupTime)}
            </span>
            <span className="font-medium flex items-center gap-2">
              <span>⏰</span>
              الساعة:
            </span>
          </div>
        )}
      </div>

      {/* Pickup Type Label */}
      <div className="text-right mb-4">
        <p className="text-sm font-medium">طلبات الأستلام</p>
      </div>

      {/* Action Buttons */}
      <RequestActions
        requestId={request.id}
        status={request.status}
        onApprove={onApprove}
        onReject={onReject}
        onComplete={onComplete}
        isLoading={isLoading}
      />
    </Card>
  );
};

export default RequestCard;
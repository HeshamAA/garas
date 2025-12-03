import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { memo } from 'react';
import { X } from 'lucide-react';
import type { PickupRequest } from '../types/request.types';
import { useRequestCard } from '../hooks/useRequestCard';
import { RequestCardHeader } from './RequestCardHeader';
import { RequestCardDetails } from './RequestCardDetails';
import { RequestCardDeliveryInfo } from './RequestCardDeliveryInfo';

interface RequestCardProps {
  request: PickupRequest;
  variant?: 'user' | 'school';
  onCancel?: (id: number) => void;
  isLoading?: boolean;
  className?: string;
}

const RequestCard = memo(({ request, onCancel, isLoading = false, className = '' }: RequestCardProps) => {
  const {
    formattedDate,
    formattedTime,
    howToReceiveLabel,
    parentInitials,
    deliveryPersonInitials,
    studentClass,
    handleCardClick,
  } = useRequestCard(request);

  const canCancel = request.status === 'pending' || request.status === 'waiting_outside';

  const handleCancelClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onCancel) {
      onCancel(request.id);
    }
  };

  return (
    <Card
      className={`flex flex-col rounded-2xl p-6 shadow-sm border border-border/50 hover:shadow-lg transition-shadow cursor-pointer ${className}`}
      onClick={handleCardClick}
    >
      <RequestCardHeader
        parentName={request.student.parent?.fullName || 'غير محدد'}
        parentImage={request.student.parent?.profileImage}
        parentInitials={parentInitials}
        status={request.status}
      />

      <RequestCardDetails
        studentName={request.student.fullName}
        studentClass={studentClass}
        location={request.location}
        formattedDate={formattedDate}
        formattedTime={formattedTime}
        howToReceiveLabel={howToReceiveLabel}
        showCarDetails={request.howToReceive === 'car'}
        carNumber={request.numberOfCar}
        carType={request.carType}
        carColor={request.carColor}
      />

      <RequestCardDeliveryInfo
        deliveryPerson={request.deliveryPerson}
        deliveryPersonInitials={deliveryPersonInitials}
      />

      {canCancel && (
        <div className="mt-4 pt-4 border-t border-border/50">
          <Button
            variant="outline"
            className="w-full rounded-full py-6 bg-destructive/10 text-destructive hover:bg-destructive/20 border-0"
            onClick={handleCancelClick}
            disabled={isLoading}
          >
            <X className="w-4 h-4 ml-2" />
            إلغاء الطلب
          </Button>
        </div>
      )}
    </Card>
  );
});

RequestCard.displayName = 'RequestCard';

export default RequestCard;
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { memo, useState } from 'react';
import { X, Check } from 'lucide-react';
import type { PickupRequest } from '../types/request.types';
import { useRequestCard } from '../hooks/useRequestCard';
import { RequestCardHeader } from './RequestCardHeader';
import { RequestCardDetails } from './RequestCardDetails';
import { RequestCardDeliveryInfo } from './RequestCardDeliveryInfo';
import { RejectRequestDialog } from './RejectRequestDialog';

interface RequestCardProps {
  request: PickupRequest;
  variant?: 'user' | 'school';
  onCancel?: (id: number, reason?: string) => void;
  onApprove?: (id: number) => void;
  isLoading?: boolean;
  className?: string;
}

const RequestCard = memo(({ 
  request, 
  onCancel, 
  onApprove,
  isLoading = false, 
  className = '' 
}: RequestCardProps) => {
  const {
    formattedDate,
    formattedTime,
    howToReceiveLabel,
    parentInitials,
    deliveryPersonInitials,
    studentClass,
    handleCardClick,
  } = useRequestCard(request);

  const [showRejectDialog, setShowRejectDialog] = useState(false);

  const isPending = request.status === 'pending';

  const handleRejectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowRejectDialog(true);
  };

  const handleApproveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onApprove) {
      onApprove(request.id);
    }
  };

  const handleConfirmReject = (reason: string) => {
    if (onCancel) {
      onCancel(request.id, reason);
    }
    setShowRejectDialog(false);
  };

  return (
    <>
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

        {isPending && onApprove && onCancel && (
          <div className="mt-4 pt-4 border-t border-border/50 flex gap-3">
            <Button
              variant="outline"
              className="flex-1 rounded-full py-6 bg-destructive/10 text-destructive hover:bg-destructive/20 border-0"
              onClick={handleRejectClick}
              disabled={isLoading}
            >
              <X className="w-4 h-4 ml-2" />
              رفض الطلب
            </Button>
            <Button
              className="flex-1 rounded-full py-6 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleApproveClick}
              disabled={isLoading}
            >
              <Check className="w-4 h-4 ml-2" />
              قبول الطلب
            </Button>
          </div>
        )}
      </Card>

      <RejectRequestDialog
        open={showRejectDialog}
        onOpenChange={setShowRejectDialog}
        onConfirm={handleConfirmReject}
        isLoading={isLoading}
        studentName={request.student.fullName}
      />
    </>
  );
});

RequestCard.displayName = 'RequestCard';

export default RequestCard;
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
  const isFastRequest = request.status === 'fast_request';

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
        className={`flex flex-col rounded-2xl p-6 shadow-sm transition-shadow cursor-pointer relative overflow-hidden ${
          isFastRequest 
            ? 'border-2 border-purple-500 bg-gradient-to-br from-purple-50/50 to-transparent dark:from-purple-950/20 shadow-purple-200 dark:shadow-purple-900/50' 
            : 'border border-border/50 hover:shadow-lg'
        } ${className}`}
        onClick={handleCardClick}
      >
        {isFastRequest && (
          <div className="absolute top-0 left-0 bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-1 text-xs font-bold rounded-br-lg flex items-center gap-1 shadow-lg z-10">
            <span className="text-lg">⚡</span>
            طلب سريع
          </div>
        )}

        <div className={isFastRequest ? 'mt-8' : ''}>
          <RequestCardHeader
            parentName={request.student.parent?.fullName || 'غير محدد'}
            parentImage={request.student.parent?.profileImage}
            parentInitials={parentInitials}
            status={request.status}
          />
        </div>

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

        {request.requestReason && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">سبب الطلب:</p>
            <p className="text-sm text-blue-900 dark:text-blue-300">{request.requestReason}</p>
          </div>
        )}

        {request.cancellationReason && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-xs font-semibold text-red-700 dark:text-red-400 mb-1">سبب الرفض:</p>
            <p className="text-sm text-red-900 dark:text-red-300">{request.cancellationReason}</p>
          </div>
        )}

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
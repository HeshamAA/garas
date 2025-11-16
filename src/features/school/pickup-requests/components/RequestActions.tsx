import { Button } from '@/components/ui/button';
import { RequestStatus } from '../types/request.types';

interface RequestActionsProps {
  requestId: string;
  status: RequestStatus;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onComplete?: (id: string) => void;
  onCancel?: (id: string) => void;
  onConfirm?: (id: string) => void;
  isLoading?: boolean;
  className?: string;
}

const RequestActions = ({
  requestId,
  status,
  onApprove,
  onReject,
  onComplete,
  onCancel,
  onConfirm,
  isLoading = false,
  className = '',
}: RequestActionsProps) => {
  if (status === 'pending' && onApprove && onReject) {
    return (
      <div className={`flex gap-3 ${className}`}>
        <Button
          variant="outline"
          className="flex-1 rounded-full py-6 bg-destructive/10 text-destructive hover:bg-destructive/20 border-0"
          onClick={() => onReject(requestId)}
          disabled={isLoading}
        >
          رفض
        </Button>
        <Button
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-6"
          onClick={() => onApprove(requestId)}
          disabled={isLoading}
        >
          موافقة
        </Button>
      </div>
    );
  }
  if (status === 'approved' && onComplete) {
    return (
      <Button
        className="w-full rounded-full py-6"
        onClick={() => onComplete(requestId)}
        disabled={isLoading}
      >
        تأكيد التسليم
      </Button>
    );
  }
  if (onConfirm && onCancel) {
    return (
      <div className={`flex gap-3 ${className}`}>
        <Button
          variant="outline"
          className="flex-1 rounded-full"
          onClick={() => onCancel(requestId)}
          disabled={isLoading}
        >
          ألغاء
        </Button>
        <Button
          className="flex-1 rounded-full"
          onClick={() => onConfirm(requestId)}
          disabled={isLoading}
        >
          تأكيد
        </Button>
      </div>
    );
  }

  return null;
};

export default RequestActions;
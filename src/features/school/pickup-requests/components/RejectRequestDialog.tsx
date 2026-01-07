import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { X, AlertCircle } from 'lucide-react';

interface RejectRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (reason: string) => void;
  isLoading?: boolean;
  studentName?: string;
}

export const RejectRequestDialog = ({
  open,
  onOpenChange,
  onConfirm,
  isLoading = false,
  studentName,
}: RejectRequestDialogProps) => {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    if (reason.trim()) {
      onConfirm(reason);
      setReason('');
    }
  };

  const handleCancel = () => {
    setReason('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <AlertCircle className="w-6 h-6 text-destructive" />
            رفض طلب الاستلام
          </DialogTitle>
          <DialogDescription className="text-base">
            {studentName ? `رفض طلب استلام الطالب: ${studentName}` : 'يرجى كتابة سبب رفض الطلب'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="reason" className="text-base">
              سبب الرفض <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="reason"
              placeholder="اكتب سبب رفض الطلب..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[120px] resize-none"
              disabled={isLoading}
            />
            <p className="text-sm text-muted-foreground">
              سيتم إرسال السبب إلى ولي الأمر
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
            className="flex-1"
          >
            <X className="w-4 h-4 ml-2" />
            إلغاء
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirm}
            disabled={isLoading || !reason.trim()}
            className="flex-1"
          >
            {isLoading ? 'جاري الرفض...' : 'تأكيد الرفض'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

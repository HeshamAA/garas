import { Button } from "@/components/ui/button";
import { TrustedReceiver } from "../types/receiver.types";

interface TrustedReceiverCardProps {
  receiver: TrustedReceiver;
  onActivate?: (receiverId: string) => void;
  onDeactivate?: (receiverId: string) => void;
  isUpdating?: boolean;
}

const TrustedReceiverCard = ({ 
  receiver, 
  onActivate, 
  onDeactivate,
  isUpdating = false 
}: TrustedReceiverCardProps) => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Button
            variant={receiver.status === "active" ? "default" : "destructive"}
            className={`${
              receiver.status === "active"
                ? "bg-success text-success-foreground hover:bg-success/90"
                : "bg-destructive text-destructive-foreground hover:bg-destructive/90"
            } px-6 py-5 text-sm rounded-full`}
            disabled
          >
            {receiver.status === "active" ? "نشط" : "محمد"}
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <h3 className="text-lg font-bold">{receiver.name}</h3>
            <p className="text-sm text-muted-foreground">{receiver.guardian}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            {receiver.avatar ? (
              <img
                src={receiver.avatar}
                alt={receiver.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                {receiver.name.charAt(0)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Receiver Name */}
      <div className="text-right mb-4">
        <p className="text-sm">
          <span className="text-primary">ولي الأمر: </span>
          <span className="text-primary/70">⚫</span>
          <span className="text-foreground"> {receiver.receiver}</span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          className="flex-1 rounded-full py-6 bg-muted hover:bg-muted/80 text-foreground border-0"
          onClick={() => onDeactivate?.(receiver.id)}
          disabled={isUpdating || receiver.status === 'inactive'}
        >
          تجميد
        </Button>
        <Button 
          className="flex-1 bg-success text-success-foreground hover:bg-success/90 rounded-full py-6"
          onClick={() => onActivate?.(receiver.id)}
          disabled={isUpdating || receiver.status === 'active'}
        >
          تنشيط
        </Button>
      </div>
    </div>
  );
};

export default TrustedReceiverCard;
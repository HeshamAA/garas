import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IdCard, User, Phone } from "lucide-react";

interface ReceiverCardProps {
  receiver: any;
  onPickupRequestsClick?: (receiverId: string) => void;
}

const ReceiverCard = ({ receiver, onPickupRequestsClick }: ReceiverCardProps) => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 hover:shadow-lg transition-shadow" dir="rtl">
      {/* Header */}
      <div className="flex items-start justify-start gap-4 mb-4">
        {receiver.profileImage ? (
          <img 
            src={receiver.profileImage} 
            alt={receiver.fullName}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center border-2 border-gray-200">
            <User className="w-8 h-8 text-muted-foreground" />
          </div>
        )}
        
        <div className="flex-1 text-right">
          <h3 className="text-lg font-bold">{receiver.fullName}</h3>
          {receiver.user?.email && (
            <p className="text-sm text-muted-foreground mt-1">{receiver.user.email}</p>
          )}
        </div>

        <Badge
          variant="default"
          className="bg-success text-success-foreground px-4 py-1 text-sm rounded-full"
        >
          نشط
        </Badge>
      </div>

      {/* Details */}
      <div className="space-y-3 text-right mb-4 border-t pt-4">
        <div className="flex items-center justify-start gap-2 text-sm">
          <Phone className="w-4 h-4 text-primary" />
          <span className="font-medium text-gray-700">رقم الجوال:</span>
          <span className="text-foreground">{receiver.user?.phoneNumber}</span>
        </div>

        <div className="flex items-center justify-start gap-2 text-sm">
          <IdCard className="w-4 h-4 text-primary" />
          <span className="font-medium text-gray-700">الرقم القومي:</span>
          <span className="text-foreground">{receiver.nationalId}</span>
        </div>
      </div>

      {/* Footer Button */}
      <Button 
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-6 flex items-center justify-center gap-2"
        onClick={() => onPickupRequestsClick?.(receiver.id)}
      >
        <span className="text-lg">⚠️</span>
        <span>طلبات الاستلام</span>
        <Badge className="bg-warning text-warning-foreground rounded-full">
          0
        </Badge>
      </Button>
    </div>
  );
};

export default ReceiverCard;
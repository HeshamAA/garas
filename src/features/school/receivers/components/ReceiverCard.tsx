import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IdCard, Car, User } from "lucide-react";
import { Receiver } from "../types/receiver.types";

interface ReceiverCardProps {
  receiver: Receiver;
  onPickupRequestsClick?: (receiverId: string) => void;
}

const ReceiverCard = ({ receiver, onPickupRequestsClick }: ReceiverCardProps) => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Badge
            variant={receiver.status === "active" ? "default" : "destructive"}
            className={`${
              receiver.status === "active"
                ? "bg-success text-success-foreground"
                : "bg-destructive text-destructive-foreground"
            } px-4 py-1 text-sm rounded-full`}
          >
            {receiver.status === "active" ? "نشط" : "غير نشط"}
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <h3 className="text-lg font-bold">{receiver.name}</h3>
            <p className="text-sm text-muted-foreground">{receiver.guardian}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 text-right mb-4">
        <div className="flex items-center justify-end gap-2 text-sm">
          <span className="text-foreground">{receiver.phone}</span>
          <span className="text-primary">📱 رقم الجوال:</span>
        </div>

        <div className="flex items-center justify-end gap-2 text-sm">
          <span className="text-foreground">{receiver.nationalId}</span>
          <IdCard className="w-4 h-4 text-primary" />
          <span className="text-primary">الرقم القومي:</span>
        </div>

        <div className="flex items-center justify-end gap-2 text-sm">
          <span className="text-foreground">{receiver.relationship}</span>
          <User className="w-4 h-4 text-primary" />
          <span className="text-primary">العلاقة بالطالب:</span>
        </div>

        <div className="flex items-start justify-end gap-2 text-sm">
          <div className="flex flex-wrap gap-2 justify-end">
            {receiver.students.map((student, idx) => (
              <Badge key={idx} variant="secondary" className="bg-primary/10 text-primary">
                {student}
              </Badge>
            ))}
          </div>
          <User className="w-4 h-4 text-primary mt-1" />
          <span className="text-primary">الطالب المرتبطين:</span>
        </div>

        <div className="flex items-start justify-end gap-2 text-sm">
          <div className="flex flex-wrap gap-2 justify-end">
            {receiver.vehicles.map((vehicle, idx) => (
              <Badge key={idx} variant="secondary" className="bg-primary/10 text-primary">
                {vehicle}
              </Badge>
            ))}
          </div>
          <Car className="w-4 h-4 text-primary mt-1" />
          <span className="text-primary">رقع المركبة:</span>
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
          {receiver.pickupRequests}
        </Badge>
      </Button>
    </div>
  );
};

export default ReceiverCard;
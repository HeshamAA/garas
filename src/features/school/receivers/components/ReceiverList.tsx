import { Receiver } from "../types/receiver.types";
import ReceiverCard from "./ReceiverCard";
import { EmptyState } from '@/shared/components/EmptyState';

interface ReceiverListProps {
  receivers: Receiver[];
  isLoading?: boolean;
  emptyMessage?: string;
  onPickupRequestsClick?: (receiverId: string) => void;
}

const ReceiverList = ({ 
  receivers, 
  isLoading = false, 
  emptyMessage = "لا توجد مستلمون",
  onPickupRequestsClick 
}: ReceiverListProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (receivers.length === 0) {
    return (
      <EmptyState 
        message="لا يوجد مستلمون" 
        description="لم يتم العثور على أي مستلمين. قم بإضافة مستلمين جدد للبدء."
      />
    );
  }

  return (
    <div className="space-y-4">
      {receivers.map((receiver) => (
        <ReceiverCard 
          key={receiver.id} 
          receiver={receiver}
          onPickupRequestsClick={onPickupRequestsClick}
        />
      ))}
    </div>
  );
};

export default ReceiverList;
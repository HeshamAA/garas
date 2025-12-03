import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { DeliveryPerson } from '../types/request.types';

interface RequestCardDeliveryInfoProps {
  deliveryPerson: DeliveryPerson | null;
  deliveryPersonInitials: string;
}

export const RequestCardDeliveryInfo = ({
  deliveryPerson,
  deliveryPersonInitials,
}: RequestCardDeliveryInfoProps) => {
  return (
    <div className="space-y-2 p-3 bg-primary/5 rounded-lg mt-2">
      <p className="font-medium text-sm">معلومات المستلم:</p>
      {deliveryPerson ? (
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage
              src={deliveryPerson.profileImage || undefined}
              loading="lazy"
            />
            <AvatarFallback>{deliveryPersonInitials}</AvatarFallback>
          </Avatar>
          <div className="text-right flex-1">
            <p className="font-medium text-sm">{deliveryPerson.fullName}</p>
            <p className="text-xs text-muted-foreground">
              {deliveryPerson.user?.phoneNumber || 'غير محدد'}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">غير محدد</p>
      )}
    </div>
  );
};

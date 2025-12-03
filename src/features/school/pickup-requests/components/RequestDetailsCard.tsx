import { Card } from '@/components/ui/card';
import { Clock, MapPin, User, Car } from 'lucide-react';

interface RequestDetailsCardProps {
  date: string;
  location: string;
  howToReceive: string;
  numberOfCar?: string | null;
  formatDate: (date: string) => string;
  formatTime: (date: string) => string;
  getHowToReceiveLabel: (how: string) => string;
}

export const RequestDetailsCard = ({
  date,
  location,
  howToReceive,
  numberOfCar,
  formatDate,
  formatTime,
  getHowToReceiveLabel,
}: RequestDetailsCardProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">تفاصيل الطلب</h2>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-primary mt-1" />
          <div>
            <p className="text-sm text-muted-foreground">موعد الاستلام</p>
            <p className="font-medium">
              {formatDate(date)} - {formatTime(date)}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-primary mt-1" />
          <div>
            <p className="text-sm text-muted-foreground">الموقع</p>
            <p className="font-medium">{location}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <User className="w-5 h-5 text-primary mt-1" />
          <div>
            <p className="text-sm text-muted-foreground">طريقة الاستلام</p>
            <p className="font-medium">{getHowToReceiveLabel(howToReceive)}</p>
          </div>
        </div>

        {numberOfCar && (
          <div className="flex items-start gap-3">
            <Car className="w-5 h-5 text-primary mt-1" />
            <div>
              <p className="text-sm text-muted-foreground">رقم السيارة</p>
              <p className="font-medium">{numberOfCar}</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

import { MapPin, User, Clock } from 'lucide-react';

interface RequestCardDetailsProps {
  studentName: string;
  studentClass: string;
  location: string;
  formattedDate: string;
  formattedTime: string;
  howToReceiveLabel: string;
  showCarDetails?: boolean;
  carNumber?: string | null;
  carType?: string | null;
  carColor?: string | null;
}

export const RequestCardDetails = ({
  studentName,
  studentClass,
  location,
  formattedDate,
  formattedTime,
  howToReceiveLabel,
  showCarDetails,
  carNumber,
  carType,
  carColor,
}: RequestCardDetailsProps) => {
  return (
    <div className="space-y-3 mb-4 text-right h-full max-h-full flex flex-col justify-around">
      <div className="flex items-center text-sm gap-2">
        <span className="font-medium flex items-center gap-2">
          <User className="w-4 h-4" />
          الطالب:
        </span>
        <span className="text-primary">
          {studentName} - {studentClass}
        </span>
      </div>

      <div className="flex items-center text-sm gap-2">
        <span className="font-medium flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          الموقع:
        </span>
        <span className="text-primary">{location || 'غير محدد'}</span>
      </div>

      <div className="flex items-center text-sm gap-2">
        <span className="font-medium flex items-center gap-2">
          <Clock className="w-4 h-4" />
          التاريخ:
        </span>
        <span className="text-primary">
          {formattedDate} - {formattedTime}
        </span>
      </div>

      <div className="flex items-center text-sm gap-2">
        <span className="font-medium">طريقة الاستلام:</span>
        <span className="text-primary">{howToReceiveLabel}</span>
      </div>

      {showCarDetails && (
        <div className="flex items-center text-sm gap-2 flex-wrap">
          <span className="font-medium">تفاصيل السيارة:</span>
          <span className="text-primary">
            رقم السيارة: {carNumber || 'غير محدد'} | نوع السيارة:{' '}
            {carType || 'غير محدد'} | لون السيارة: {carColor || 'غير محدد'}
          </span>
        </div>
      )}
    </div>
  );
};

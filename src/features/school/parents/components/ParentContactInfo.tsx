import { Mail, Phone } from 'lucide-react';

interface ParentContactInfoProps {
  phone: string;
  email: string;
}

const ParentContactInfo = ({ phone, email }: ParentContactInfoProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-end gap-2 text-sm text-primary">
        <span>{phone}</span>
        <Phone className="w-4 h-4" />
        <span className="mr-4">رقم الجوال:</span>
      </div>

      <div className="flex items-center justify-end gap-2 text-sm text-primary">
        <span>{email}</span>
        <Mail className="w-4 h-4" />
        <span className="mr-4">الايميل:</span>
      </div>
    </div>
  );
};

export default ParentContactInfo;
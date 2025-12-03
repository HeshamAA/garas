import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { CreatePlanPayload } from '../../types/subscription.types';

interface CreatePlanFormProps {
  formValues: CreatePlanPayload;
  featuresInput: string;
  isSubmitting: boolean;
  onInputChange: (key: keyof CreatePlanPayload, value: string | number | boolean) => void;
  onFeaturesChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const CreatePlanForm = ({
  formValues,
  featuresInput,
  isSubmitting,
  onInputChange,
  onFeaturesChange,
  onSubmit,
}: CreatePlanFormProps) => {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="space-y-2">
        <label className="text-sm font-medium">اسم الخطة</label>
        <Input value={formValues.name} onChange={(event) => onInputChange('name', event.target.value)} required />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">الوصف</label>
        <Textarea value={formValues.description} onChange={(event) => onInputChange('description', event.target.value)} rows={3} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">السعر (ر.س)</label>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={formValues.price}
            onChange={(event) => onInputChange('price', Number(event.target.value))}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">مدة الخطة (يوم)</label>
          <Input
            type="number"
            min="1"
            value={formValues.duration}
            onChange={(event) => onInputChange('duration', Number(event.target.value))}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">الطلاب المسموحون</label>
          <Input
            type="number"
            min="0"
            value={formValues.maxStudents}
            onChange={(event) => onInputChange('maxStudents', Number(event.target.value))}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">المستلمون المسموحون</label>
          <Input
            type="number"
            min="0"
            value={formValues.maxDeliveryPersons}
            onChange={(event) => onInputChange('maxDeliveryPersons', Number(event.target.value))}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">المميزات (سطر لكل ميزة)</label>
        <Textarea
          value={featuresInput}
          onChange={(event) => onFeaturesChange(event.target.value)}
          rows={4}
          placeholder="إشعارات غير محدودة
تقارير متقدمة
دعم فني 24/7"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">حالة الخطة</label>
        <Select value={String(formValues.isActive)} onValueChange={(value) => onInputChange('isActive', value === 'true')}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">نشطة</SelectItem>
            <SelectItem value="false">متوقفة حالياً</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
        حفظ الخطة
      </Button>
    </form>
  );
};

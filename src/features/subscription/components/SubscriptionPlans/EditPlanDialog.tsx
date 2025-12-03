import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { UpdatePlanPayload } from '../../types/subscription.types';

interface EditPlanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editValues: UpdatePlanPayload;
  featuresInput: string;
  loading: boolean;
  isUpdating: boolean;
  onInputChange: (key: keyof UpdatePlanPayload, value: string | number | boolean) => void;
  onFeaturesChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const EditPlanDialog = ({
  open,
  onOpenChange,
  editValues,
  featuresInput,
  loading,
  isUpdating,
  onInputChange,
  onFeaturesChange,
  onSubmit,
}: EditPlanDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-2xl">تعديل الخطة</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">اسم الخطة *</Label>
              <Input
                id="edit-name"
                value={editValues.name || ''}
                onChange={(e) => onInputChange('name', e.target.value)}
                placeholder="مثال: الخطة الأساسية"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">الوصف *</Label>
              <Textarea
                id="edit-description"
                value={editValues.description || ''}
                onChange={(e) => onInputChange('description', e.target.value)}
                placeholder="وصف مختصر للخطة"
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-price">السعر (ر.س) *</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={editValues.price || 0}
                  onChange={(e) => onInputChange('price', Number(e.target.value))}
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-duration">المدة (بالأيام) *</Label>
                <Input
                  id="edit-duration"
                  type="number"
                  value={editValues.duration || 30}
                  onChange={(e) => onInputChange('duration', Number(e.target.value))}
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-maxStudents">الحد الأقصى للطلاب *</Label>
                <Input
                  id="edit-maxStudents"
                  type="number"
                  value={editValues.maxStudents || 0}
                  onChange={(e) => onInputChange('maxStudents', Number(e.target.value))}
                  min="0"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-maxDeliveryPersons">الحد الأقصى للمستلمين *</Label>
                <Input
                  id="edit-maxDeliveryPersons"
                  type="number"
                  value={editValues.maxDeliveryPersons || 0}
                  onChange={(e) => onInputChange('maxDeliveryPersons', Number(e.target.value))}
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-features">المميزات (كل ميزة في سطر منفصل)</Label>
              <Textarea
                id="edit-features"
                value={featuresInput}
                onChange={(e) => onFeaturesChange(e.target.value)}
                placeholder="إدارة الطلاب&#10;إدارة المستلمين&#10;تقارير شاملة"
                rows={5}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
              <Label htmlFor="edit-isActive" className="cursor-pointer">
                تفعيل الخطة
              </Label>
              <Switch
                id="edit-isActive"
                checked={editValues.isActive ?? true}
                onCheckedChange={(checked) => onInputChange('isActive', checked)}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isUpdating}
                className="flex-1"
              >
                إلغاء
              </Button>
              <Button type="submit" disabled={isUpdating} className="flex-1">
                {isUpdating && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
                حفظ التعديلات
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Unlock } from 'lucide-react';
import { forgotPasswordApi } from '../api/forgotPasswordApi';
import { useToast } from '@/hooks/use-toast';

interface ForgotPasswordStep3Props {
  email: string;
  otpCode: string;
  onComplete: () => void;
  onBack: () => void;
}

export const ForgotPasswordStep3 = ({ email, otpCode, onComplete, onBack }: ForgotPasswordStep3Props) => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirm) {
      toast({ title: 'خطأ', description: 'من فضلك املأ الحقول المطلوبة', variant: 'destructive' });
      return;
    }

    if (password !== confirm) {
      toast({ title: 'خطأ', description: 'كلمتا المرور غير متطابقتين', variant: 'destructive' });
      return;
    }

    setIsLoading(true);
    try {
      await forgotPasswordApi.updatePassword({ email, newPassword: password, otpAgin: otpCode });
      toast({ title: 'تم التحديث', description: 'تم تحديث كلمة المرور بنجاح' });
      onComplete();
    } catch (error) {
      toast({ title: 'خطأ', description: 'فشل تحديث كلمة المرور', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        العودة
      </button>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold">تعيين كلمة مرور جديدة</h1>
        <p className="text-muted-foreground">أدخل كلمة المرور الجديدة للحساب {email}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">كلمة المرور الجديدة</Label>
          <div className="relative">
            <Unlock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="أدخل كلمة المرور الجديدة"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm">تأكيد كلمة المرور</Label>
          <Input
            id="confirm"
            type="password"
            placeholder="أعد إدخال كلمة المرور"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'جاري الحفظ...' : 'حفظ كلمة المرور'}
        </Button>
      </form>
    </div>
  );
};

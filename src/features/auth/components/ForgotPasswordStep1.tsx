import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Mail } from 'lucide-react';
import { forgotPasswordApi } from '../api/forgotPasswordApi';
import { useToast } from '@/hooks/use-toast';

interface ForgotPasswordStep1Props {
  onComplete: (email: string) => void;
  onBack: () => void;
}

export const ForgotPasswordStep1 = ({ onComplete, onBack }: ForgotPasswordStep1Props) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: 'خطأ',
        description: 'من فضلك أدخل البريد الإلكتروني',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      await forgotPasswordApi.forgetPassword({ email });
      toast({
        title: 'تم الإرسال',
        description: 'تم إرسال رمز التحقق إلى بريدك الإلكتروني',
      });
      onComplete(email);
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'حدث خطأ أثناء إرسال رمز التحقق',
        variant: 'destructive',
      });
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
        العودة لتسجيل الدخول
      </button>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold">نسيت كلمة المرور؟</h1>
        <p className="text-muted-foreground">
          أدخل بريدك الإلكتروني وسنرسل لك رمز التحقق
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <div className="relative">
            <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pr-10"
              disabled={isLoading}
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'جاري الإرسال...' : 'إرسال رمز التحقق'}
        </Button>
      </form>
    </div>
  );
};

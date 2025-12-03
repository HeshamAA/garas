import { useState } from 'react';
import { useToast } from '@/shared/hooks';
import { forgotPasswordApi } from '../api/forgotPasswordApi';

interface UseForgotPasswordStep3Props {
  email: string;
  otpCode: string;
  onComplete: () => void;
}

export const useForgotPasswordStep3 = ({ email, otpCode, onComplete }: UseForgotPasswordStep3Props) => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirm) {
      toast.error('من فضلك املأ الحقول المطلوبة');
      return;
    }

    if (password !== confirm) {
      toast.error('كلمتا المرور غير متطابقتين');
      return;
    }

    setIsLoading(true);
    try {
      await forgotPasswordApi.updatePassword({ email, newPassword: password, otpAgin: otpCode });
      toast.success('تم تحديث كلمة المرور بنجاح');
      onComplete();
    } catch (error) {
      toast.error('فشل تحديث كلمة المرور');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    password,
    setPassword,
    confirm,
    setConfirm,
    isLoading,
    handleSubmit,
  };
};

import { useState } from 'react';
import { useToast } from '@/shared/hooks';
import { forgotPasswordApi } from '../api/forgotPasswordApi';

interface UseForgotPasswordStep1Props {
  onComplete: (email: string) => void;
}

export const useForgotPasswordStep1 = ({ onComplete }: UseForgotPasswordStep1Props) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('من فضلك أدخل البريد الإلكتروني');
      return;
    }

    setIsLoading(true);
    try {
      await forgotPasswordApi.forgetPassword({ email });
      toast.success('تم إرسال رمز التحقق إلى بريدك الإلكتروني');
      onComplete(email);
    } catch (error) {
      toast.error('حدث خطأ أثناء إرسال رمز التحقق');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    isLoading,
    handleSubmit,
  };
};

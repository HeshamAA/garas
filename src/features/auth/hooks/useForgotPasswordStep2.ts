import { useState } from 'react';
import { useToast } from '@/shared/hooks';
import { forgotPasswordApi } from '../api/forgotPasswordApi';

interface UseForgotPasswordStep2Props {
  email: string;
  onComplete: (otp: string) => void;
}

export const useForgotPasswordStep2 = ({ email, onComplete }: UseForgotPasswordStep2Props) => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp) {
      toast.error('من فضلك أدخل رمز التحقق');
      return;
    }

    setIsLoading(true);
    try {
      await forgotPasswordApi.verifyOtp({ email, otpCode: otp, forgetPassword: true });
      toast.success('رمز التحقق صحيح');
      onComplete(otp);
    } catch (error) {
      toast.error('رمز التحقق غير صالح');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    otp,
    setOtp,
    isLoading,
    handleSubmit,
  };
};

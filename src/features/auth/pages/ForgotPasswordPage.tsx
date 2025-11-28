import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ForgotPasswordStep1 } from '../components/ForgotPasswordStep1';
import { ForgotPasswordStep2 } from '../components/ForgotPasswordStep2';
import { ForgotPasswordStep3 } from '../components/ForgotPasswordStep3';

export const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const navigate = useNavigate();

  const handleStep1Complete = (userEmail: string) => {
    setEmail(userEmail);
    setStep(2);
  };

  const handleStep2Complete = (otp: string) => {
    setOtpCode(otp);
    setStep(3);
  };

  const handleStep3Complete = () => {
    navigate('/login');
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        {step === 1 && (
          <ForgotPasswordStep1 
            onComplete={handleStep1Complete}
            onBack={handleBack}
          />
        )}
          
          {step === 2 && (
            <ForgotPasswordStep2 
              email={email}
              onComplete={handleStep2Complete}
              onBack={handleBack}
            />
          )}
          
          {step === 3 && (
            <ForgotPasswordStep3 
              email={email}
              otpCode={otpCode}
              onComplete={handleStep3Complete}
              onBack={handleBack}
            />
          )}
        </div>
      </div>
    );
  };


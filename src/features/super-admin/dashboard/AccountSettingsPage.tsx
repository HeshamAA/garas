import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountSettingsStep } from '../types/profile.types';

const AccountSettingsPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<AccountSettingsStep>("change");
  const [otp, setOtp] = useState("");
  const [selectedPhone, setSelectedPhone] = useState("");

  const handleChangeNumber = () => {
    if (!selectedPhone) {
      return;
    }
    setStep("verify");
  };

  const handleVerifyOTP = () => {
    if (otp.length !== 5) {
      return;
    }
    console.log('Verifying OTP:', otp);
    navigate(-1);
  };

  const handleResendOTP = () => {
    console.log('Resending OTP');
  };

  const handleCancel = () => {
    if (step === "verify") {
      setStep("change");
      setOtp("");
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-8">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">إعدادات الحساب</h1>
          <div className="w-10" />
        </div>

        {step === "change" ? (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-lg font-medium">تغيير رقم الجوال</h2>

              <Select value={selectedPhone} onValueChange={setSelectedPhone}>
                <SelectTrigger className="w-full text-right">
                  <SelectValue placeholder="رقم الجوال" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">رقم الجوال 1</SelectItem>
                  <SelectItem value="2">رقم الجوال 2</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1 rounded-full"
                  onClick={handleCancel}
                >
                  إلغاء التعديل
                </Button>
                <Button
                  className="flex-1 rounded-full"
                  onClick={handleChangeNumber}
                >
                  تغيير الرقم
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                سيتم إرسال رسالة يكون مرة واحدة إلى رقم الجوال للدخول لتأكيده
              </p>

              <div className="flex justify-center py-6">
                <InputOTP
                  maxLength={5}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  dir="ltr"
                >
                  <InputOTPGroup className="gap-3">
                    <InputOTPSlot index={0} className="w-14 h-14 text-xl border-2" />
                    <InputOTPSlot index={1} className="w-14 h-14 text-xl border-2" />
                    <InputOTPSlot index={2} className="w-14 h-14 text-xl border-2" />
                    <InputOTPSlot index={3} className="w-14 h-14 text-xl border-2" />
                    <InputOTPSlot index={4} className="w-14 h-14 text-xl border-2" />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="text-sm">
                <span className="text-muted-foreground">لم تصلك الرسالة؟ </span>
                <button 
                  className="text-primary font-medium hover:underline"
                  onClick={handleResendOTP}
                >
                  أعد الإرسال
                </button>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1 rounded-full"
                  onClick={handleCancel}
                >
                  إلغاء التعديل
                </Button>
                <Button 
                  className="flex-1 rounded-full"
                  onClick={handleVerifyOTP}
                >
                  تغيير الرقم
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AccountSettingsPage;
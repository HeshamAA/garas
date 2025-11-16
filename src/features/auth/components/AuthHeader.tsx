import type { AuthMode } from "../hooks";

interface AuthHeaderProps {
  mode: AuthMode;
}

export const AuthHeader = ({ mode }: AuthHeaderProps) => {
  return (
    <div className="text-right space-y-3 md:space-y-4">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground">
        {mode === "login" ? (
          <>
            تسجيل<br />الدخــول
          </>
        ) : (
          <>
            إنشاء<br />حساب جديد
          </>
        )}
      </h1>
      <div className="text-muted-foreground space-y-1 md:space-y-2 text-sm md:text-base">
        {mode === "login" ? (
          <>
            <p>مرحباً بك في نظام جرس لإدارة المدارس</p>
            <p className="hidden md:block">قم بإدخال بيانات الدخول الخاصة بك للوصول إلى حسابك</p>
            <p className="hidden md:block">سواء كنت ولي أمر أو مدرسة، سيتم توجيهك تلقائياً</p>
            <p className="hidden md:block">إلى الصفحة المناسبة بناءً على نوع حسابك</p>
          </>
        ) : (
          <>
            <p>مرحباً بك في نظام جرس لإدارة المدارس</p>
            <p className="hidden md:block">قم بإنشاء حساب جديد للبدء في استخدام النظام</p>
            <p className="hidden md:block">اختر نوع الحساب المناسب لك وأكمل البيانات المطلوبة</p>
          </>
        )}
      </div>
    </div>
  );
};
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { UseFormReturn } from "react-hook-form";
import type { LoginFormData } from "../hooks";

interface LoginFormProps {
  form: UseFormReturn<LoginFormData>;
  onSubmit: (data: LoginFormData) => Promise<void>;
  isLoading: boolean;
  showPassword: boolean;
  onTogglePassword: () => void;
  onToggleMode: () => void;
}

export const LoginForm = ({
  form,
  onSubmit,
  isLoading,
  showPassword,
  onTogglePassword,
  onToggleMode,
}: LoginFormProps) => {
  const navigate = useNavigate();
  return (
    <form 
      onSubmit={form.handleSubmit(onSubmit)} 
      className="space-y-6 animate-slide-in-right"
    >
      <div className="space-y-2 text-right">
        <label className="text-sm font-medium">اسم المستخدم أو البريد الإلكتروني</label>
        <Input
          {...form.register("identifier")}
          placeholder="اسم المستخدم أو البريد الإلكتروني"
          className="text-right h-12 md:h-14 rounded-2xl form-field-transition focus:ring-2 focus:ring-primary/20"
          disabled={isLoading}
        />
        {form.formState.errors.identifier && (
          <p className="text-sm text-destructive animate-fade-in flex items-center gap-1">
            <span className="text-base">⚠️</span>
            {form.formState.errors.identifier.message}
          </p>
        )}
      </div>

      <div className="space-y-2 text-right">
        <label className="text-sm font-medium">كلمة المرور</label>
        <div className="relative">
          <Input
            {...form.register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="كلمة المرور"
            className="text-right h-12 md:h-14 rounded-2xl pe-12 form-field-transition focus:ring-2 focus:ring-primary/20"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute end-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-primary"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {form.formState.errors.password && (
          <p className="text-sm text-destructive animate-fade-in flex items-center gap-1">
            <span className="text-base">⚠️</span>
            {form.formState.errors.password.message}
          </p>
        )}
        <div className="text-left">
          <button 
            type="button" 
            className="text-primary text-sm link-hover-effect"
            onClick={() => navigate('/forgot-password')}
          >
            هل نسيت كلمة المرور؟
          </button>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full rounded-full py-5 md:py-6 text-base md:text-lg button-hover-effect"
        disabled={isLoading}
      >
        {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
        {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
      </Button>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          لا تملك حساب؟{" "}
          <button
            type="button"
            onClick={onToggleMode}
            className="text-primary font-medium link-hover-effect"
            disabled={isLoading}
          >
            سجل الآن
          </button>
        </p>
      </div>
    </form>
  );
};
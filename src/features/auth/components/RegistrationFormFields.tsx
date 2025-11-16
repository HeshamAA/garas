import { Input } from "@/components/ui/input";
import { Upload, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { UseFormReturn } from "react-hook-form";
import type { SchoolFormData, OwnerFormData } from "../hooks";

interface RegistrationFormFieldsProps {
  form: UseFormReturn<SchoolFormData> | UseFormReturn<OwnerFormData>;
  isRegistering: boolean;
  imagePreview: string | null;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleMode: () => void;
  fields: {
    name: { label: string; placeholder: string; fieldName: string };
    phone: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
  };
}

export const RegistrationFormFields = ({
  form,
  isRegistering,
  imagePreview,
  onImageUpload,
  onToggleMode,
  fields,
}: RegistrationFormFieldsProps) => {
  return (
    <>
      <div className="space-y-4">
        <div className="space-y-2 text-right">
          <label className="text-sm font-medium">{fields.name.label}</label>
          <Input
            {...form.register(fields.name.fieldName as 'name' | 'ownerName')}
            placeholder={fields.name.placeholder}
            className="text-right h-14 rounded-2xl form-field-transition focus:ring-2 focus:ring-primary/20"
            disabled={isRegistering}
          />
          {form.formState.errors[fields.name.fieldName as keyof typeof form.formState.errors] && (
            <p className="text-sm text-destructive animate-fade-in flex items-center gap-1">
              <span className="text-base">⚠️</span>
              {form.formState.errors[fields.name.fieldName as keyof typeof form.formState.errors]?.message as string}
            </p>
          )}
        </div>

        <div className="space-y-2 text-right">
          <label className="text-sm font-medium">{fields.phone.label}</label>
          <Input
            {...form.register("phone")}
            placeholder={fields.phone.placeholder}
            className="text-right h-14 rounded-2xl form-field-transition focus:ring-2 focus:ring-primary/20"
            disabled={isRegistering}
          />
          {form.formState.errors.phone && (
            <p className="text-sm text-destructive animate-fade-in flex items-center gap-1">
              <span className="text-base">⚠️</span>
              {form.formState.errors.phone.message}
            </p>
          )}
        </div>

        <div className="space-y-2 text-right">
          <label className="text-sm font-medium">{fields.email.label}</label>
          <Input
            {...form.register("email")}
            placeholder={fields.email.placeholder}
            type="email"
            className="text-right h-14 rounded-2xl form-field-transition focus:ring-2 focus:ring-primary/20"
            disabled={isRegistering}
          />
          {form.formState.errors.email && (
            <p className="text-sm text-destructive animate-fade-in flex items-center gap-1">
              <span className="text-base">⚠️</span>
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2 text-right">
          <label className="text-sm font-medium">كلمة المرور</label>
          <Input
            {...form.register("password")}
            type="password"
            placeholder="كلمة المرور"
            className="text-right h-14 rounded-2xl form-field-transition focus:ring-2 focus:ring-primary/20"
            disabled={isRegistering}
          />
          {form.formState.errors.password && (
            <p className="text-sm text-destructive animate-fade-in flex items-center gap-1">
              <span className="text-base">⚠️</span>
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2 text-right">
          <label className="text-sm font-medium">تأكيد كلمة المرور</label>
          <Input
            {...form.register("confirmPassword")}
            type="password"
            placeholder="تأكيد كلمة المرور"
            className="text-right h-14 rounded-2xl form-field-transition focus:ring-2 focus:ring-primary/20"
            disabled={isRegistering}
          />
          {form.formState.errors.confirmPassword && (
            <p className="text-sm text-destructive animate-fade-in flex items-center gap-1">
              <span className="text-base">⚠️</span>
              {form.formState.errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <div className="bg-secondary/30 rounded-2xl p-6 border border-border form-field-transition hover:border-primary/30">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 rounded-full object-cover border-4 border-primary transition-transform hover:scale-105"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center border-4 border-primary/30 transition-all hover:border-primary/50">
                <User className="w-16 h-16 text-primary" />
              </div>
            )}
          </div>

          <label className="cursor-pointer">
            <div className="flex items-center gap-2 text-primary font-medium link-hover-effect">
              <Upload className="w-5 h-5" />
              <span>أرفق صورة</span>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={onImageUpload}
              disabled={isRegistering}
            />
          </label>
          <p className="text-sm text-muted-foreground">يرجى إرفاق صورة</p>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full rounded-full py-6 text-lg button-hover-effect"
        disabled={isRegistering}
      >
        {isRegistering && <Loader2 className="w-5 h-5 animate-spin" />}
        {isRegistering ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
      </Button>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          لديك حساب بالفعل؟{" "}
          <button
            type="button"
            onClick={onToggleMode}
            className="text-primary font-medium link-hover-effect"
            disabled={isRegistering}
          >
            سجل الدخول
          </button>
        </p>
      </div>
    </>
  );
};
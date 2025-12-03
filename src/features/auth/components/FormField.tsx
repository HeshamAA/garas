import { Input } from "@/components/ui/input";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormFieldProps {
  label: string;
  placeholder: string;
  type?: string;
  disabled?: boolean;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

export const FormField = ({
  label,
  placeholder,
  type = "text",
  disabled = false,
  register,
  error,
}: FormFieldProps) => {
  return (
    <div className="space-y-2 text-right">
      <label className="text-sm font-medium">{label}</label>
      <Input
        {...register}
        type={type}
        placeholder={placeholder}
        className="text-right h-14 rounded-2xl form-field-transition focus:ring-2 focus:ring-primary/20"
        disabled={disabled}
      />
      {error && (
        <p className="text-sm text-destructive animate-fade-in flex items-center gap-1">
          <span className="text-base">⚠️</span>
          {error.message}
        </p>
      )}
    </div>
  );
};

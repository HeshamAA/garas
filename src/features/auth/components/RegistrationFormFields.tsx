import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { UseFormReturn } from "react-hook-form";
import type { SchoolFormData } from "../hooks";
import type { RegistrationFormFieldsProps } from "../types/registrationForm.types";
import { StagesCheckboxes } from "./StagesCheckboxes";
import { ImageUploadSection } from "./ImageUploadSection";
import { FormActions } from "./FormActions";

export const RegistrationFormFields = ({
  form,
  isRegistering,
  imagePreview,
  onImageUpload,
  onToggleMode,
  fields,
}: RegistrationFormFieldsProps) => {
  const isSchoolForm = "phoneNumber" in form.getValues();
  const schoolForm = form as UseFormReturn<SchoolFormData>;

  return (
    <>
      <div className="space-y-4">
        {/* Name Field */}
        <div className="space-y-2 text-right">
          <label className="text-sm font-medium">{fields.name.label}</label>
          <Input
            {...schoolForm.register("name")}
            placeholder={fields.name.placeholder}
            className="text-right h-14 rounded-2xl form-field-transition focus:ring-2 focus:ring-primary/20"
            disabled={isRegistering}
          />
          {schoolForm.formState.errors.name && (
            <p className="text-sm text-destructive animate-fade-in flex items-center gap-1">
              <span className="text-base">⚠️</span>
              {schoolForm.formState.errors.name.message}
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div className="space-y-2 text-right">
          <label className="text-sm font-medium">{fields.phone.label}</label>
          <Input
            {...schoolForm.register("phoneNumber")}
            placeholder={fields.phone.placeholder}
            className="text-right h-14 rounded-2xl form-field-transition focus:ring-2 focus:ring-primary/20"
            disabled={isRegistering}
          />
          {schoolForm.formState.errors.phoneNumber && (
            <p className="text-sm text-destructive animate-fade-in flex items-center gap-1">
              <span className="text-base">⚠️</span>
              {schoolForm.formState.errors.phoneNumber.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2 text-right">
          <label className="text-sm font-medium">{fields.email.label}</label>
          <Input
            {...schoolForm.register("email")}
            type="email"
            placeholder={fields.email.placeholder}
            className="text-right h-14 rounded-2xl form-field-transition focus:ring-2 focus:ring-primary/20"
            disabled={isRegistering}
          />
          {schoolForm.formState.errors.email && (
            <p className="text-sm text-destructive animate-fade-in flex items-center gap-1">
              <span className="text-base">⚠️</span>
              {schoolForm.formState.errors.email.message}
            </p>
          )}
        </div>

        {/* School-specific fields */}
        {isSchoolForm && (
          <>
            <div className="space-y-2 text-right">
              <label className="text-sm font-medium">وصف المدرسة (اختياري)</label>
              <Textarea
                {...schoolForm.register("description")}
                placeholder="وصف مختصر عن المدرسة..."
                rows={3}
                className="text-right rounded-2xl form-field-transition focus:ring-2 focus:ring-primary/20"
                disabled={isRegistering}
              />
            </div>

            <div className="space-y-2 text-right">
              <label className="text-sm font-medium">الموقع (اختياري)</label>
              <Input
                {...schoolForm.register("location")}
                placeholder="القاهرة، مصر"
                className="text-right h-14 rounded-2xl form-field-transition focus:ring-2 focus:ring-primary/20"
                disabled={isRegistering}
              />
            </div>

            <StagesCheckboxes form={schoolForm} isRegistering={isRegistering} />
          </>
        )}

        {/* Password Field */}
        <div className="space-y-2 text-right">
          <label className="text-sm font-medium">كلمة المرور</label>
          <Input
            {...schoolForm.register("password")}
            type="password"
            placeholder="كلمة المرور"
            className="text-right h-14 rounded-2xl form-field-transition focus:ring-2 focus:ring-primary/20"
            disabled={isRegistering}
          />
          {schoolForm.formState.errors.password && (
            <p className="text-sm text-destructive animate-fade-in flex items-center gap-1">
              <span className="text-base">⚠️</span>
              {schoolForm.formState.errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2 text-right">
          <label className="text-sm font-medium">تأكيد كلمة المرور</label>
          <Input
            {...schoolForm.register("confirmPassword")}
            type="password"
            placeholder="تأكيد كلمة المرور"
            className="text-right h-14 rounded-2xl form-field-transition focus:ring-2 focus:ring-primary/20"
            disabled={isRegistering}
          />
          {schoolForm.formState.errors.confirmPassword && (
            <p className="text-sm text-destructive animate-fade-in flex items-center gap-1">
              <span className="text-base">⚠️</span>
              {schoolForm.formState.errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <ImageUploadSection
        imagePreview={imagePreview}
        onImageUpload={onImageUpload}
        isRegistering={isRegistering}
        isSchoolForm={isSchoolForm}
      />

      <FormActions isRegistering={isRegistering} onToggleMode={onToggleMode} />
    </>
  );
};
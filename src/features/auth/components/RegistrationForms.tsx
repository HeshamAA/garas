import { RegistrationFormFields } from "./RegistrationFormFields";
import type { UseFormReturn } from "react-hook-form";
import type { SchoolFormData, OwnerFormData, AccountType } from "../hooks";

interface RegistrationFormsProps {
  accountType: AccountType;
  onAccountTypeChange: (value: AccountType) => void;
  schoolForm: UseFormReturn<SchoolFormData>;
  ownerForm: UseFormReturn<OwnerFormData>;
  onSchoolSubmit: (data: SchoolFormData) => Promise<void>;
  onOwnerSubmit: (data: OwnerFormData) => Promise<void>;
  isRegistering: boolean;
  imagePreview: string | null;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleMode: () => void;
}

export const RegistrationForms = ({
  accountType,
  onAccountTypeChange,
  schoolForm,
  ownerForm,
  onSchoolSubmit,
  onOwnerSubmit,
  isRegistering,
  imagePreview,
  onImageUpload,
  onToggleMode,
}: RegistrationFormsProps) => {
  return (
    <div className="space-y-6 animate-slide-in-left">
      {/* تم إزالة خيار اختيار نوع الحساب - التسجيل للمدارس فقط */}
      <form 
        onSubmit={schoolForm.handleSubmit(onSchoolSubmit)} 
        className="space-y-6 animate-zoom-in"
      >
        <RegistrationFormFields
          form={schoolForm}
          isRegistering={isRegistering}
          imagePreview={imagePreview}
          onImageUpload={onImageUpload}
          onToggleMode={onToggleMode}
          fields={{
            name: { label: "اسم المدرسة", placeholder: "اسم المدرسة", fieldName: "ownerName" },
            phone: { label: "رقم جوال المدرسة", placeholder: "رقم الجوال" },
            email: { label: "البريد الإلكتروني", placeholder: "البريد الإلكتروني" },
          }}
        />
      </form>
    </div>
  );
};
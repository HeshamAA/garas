import { RegistrationFormFields } from "./RegistrationFormFields";
import type { UseFormReturn } from "react-hook-form";
import type { SchoolFormData } from "../hooks";

interface RegistrationFormsProps {
  schoolForm: UseFormReturn<SchoolFormData>;
  onSchoolSubmit: (data: SchoolFormData) => Promise<void>;
  isRegistering: boolean;
  imagePreview: string | null;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleMode: () => void;
}

export const RegistrationForms = ({
  schoolForm,
  onSchoolSubmit,
  isRegistering,
  imagePreview,
  onImageUpload,
  onToggleMode,
}: RegistrationFormsProps) => {
  return (
    <div className="space-y-6 animate-slide-in-left">
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
            name: { label: "اسم المدرسة", placeholder: "اسم المدرسة", fieldName: "name" },
            phone: { label: "رقم جوال المدرسة", placeholder: "رقم الجوال", fieldName: "phoneNumber" },
            email: { label: "البريد الإلكتروني", placeholder: "البريد الإلكتروني" },
          }}
        />
      </form>
    </div>
  );
};
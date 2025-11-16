import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
      <div className="space-y-2 text-right">
        <label className="text-sm font-medium">نوع الحساب</label>
        <Select
          value={accountType}
          onValueChange={onAccountTypeChange}
          disabled={isRegistering}
        >
          <SelectTrigger className="h-14 rounded-2xl text-right form-field-transition focus:ring-2 focus:ring-primary/20">
            <SelectValue placeholder="اختر نوع الحساب" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="school">مدرسة</SelectItem>
            <SelectItem value="owner">مالك</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {accountType === "school" && (
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
              name: { label: "إسم المالك", placeholder: "الإسم للمدرسة", fieldName: "ownerName" },
              phone: { label: "رقم جوال المالك", placeholder: "رقم الجوال" },
              email: { label: "البريد الالكتروني", placeholder: "البريد الالكتروني" },
            }}
          />
        </form>
      )}

      {accountType === "owner" && (
        <form 
          onSubmit={ownerForm.handleSubmit(onOwnerSubmit)} 
          className="space-y-6 animate-zoom-in"
        >
          <RegistrationFormFields
            form={ownerForm}
            isRegistering={isRegistering}
            imagePreview={imagePreview}
            onImageUpload={onImageUpload}
            onToggleMode={onToggleMode}
            fields={{
              name: { label: "الاسم", placeholder: "الاسم الكامل", fieldName: "name" },
              phone: { label: "رقم الجوال", placeholder: "رقم الجوال" },
              email: { label: "البريد الالكتروني", placeholder: "البريد الالكتروني" },
            }}
          />
        </form>
      )}
    </div>
  );
};
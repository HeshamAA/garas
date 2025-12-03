import type { UseFormReturn } from "react-hook-form";
import type { SchoolFormData, OwnerFormData } from "../hooks";

export interface Stage {
  id: string;
  label: string;
}

export interface FieldConfig {
  label: string;
  placeholder: string;
  fieldName?: string;
}

export interface FormFieldsConfig {
  name: FieldConfig;
  phone: FieldConfig;
  email: FieldConfig;
}

export interface StagesCheckboxesProps {
  form: UseFormReturn<SchoolFormData>;
  isRegistering: boolean;
}

export interface RegistrationFormFieldsProps {
  form: UseFormReturn<SchoolFormData> | UseFormReturn<OwnerFormData>;
  isRegistering: boolean;
  imagePreview: string | null;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleMode: () => void;
  fields: FormFieldsConfig;
}

export interface ImageUploadSectionProps {
  imagePreview: string | null;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isRegistering: boolean;
  isSchoolForm: boolean;
}

export interface FormActionsProps {
  isRegistering: boolean;
  onToggleMode: () => void;
}

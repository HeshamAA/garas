import { Upload, User } from "lucide-react";
import type { ImageUploadSectionProps } from "../types/registrationForm.types";

export const ImageUploadSection = ({
  imagePreview,
  onImageUpload,
  isRegistering,
  isSchoolForm,
}: ImageUploadSectionProps) => {
  return (
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
            <span>{isSchoolForm ? "أرفق شعار المدرسة" : "أرفق صورة"}</span>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={onImageUpload}
            disabled={isRegistering}
          />
        </label>
        <p className="text-sm text-muted-foreground">
          {isSchoolForm ? "شعار المدرسة (اختياري)" : "يرجى إرفاق صورة"}
        </p>
      </div>
    </div>
  );
};

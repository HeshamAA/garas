import { useState } from "react";
import { useLocation } from "react-router-dom";
import type { UseFormSetValue } from "react-hook-form";
import type { SchoolFormData, OwnerFormData } from "./useAuthForm";

export type AuthMode = "login" | "register";
export type AccountType = "owner" | "school";

export const useAuthState = () => {
  const location = useLocation();
  const initialMode = (location.state as { mode?: AuthMode })?.mode || "login";

  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [accountType, setAccountType] = useState<AccountType>("school");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setShowPassword(false);
  };

  const handleAccountTypeChange = (value: AccountType) => {
    setAccountType(value);
    setImagePreview(null);
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    schoolFormSetValue: UseFormSetValue<SchoolFormData>,
    ownerFormSetValue: UseFormSetValue<OwnerFormData>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);

        if (accountType === "school") {
          schoolFormSetValue("logo", file);
        } else {
          ownerFormSetValue("avatar", result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return {
    mode,
    accountType,
    imagePreview,
    showPassword,
    setShowPassword,
    toggleMode,
    handleAccountTypeChange,
    handleImageUpload,
  };
};
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import type { FormActionsProps } from "../types/registrationForm.types";

export const FormActions = ({ isRegistering, onToggleMode }: FormActionsProps) => {
  return (
    <>
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

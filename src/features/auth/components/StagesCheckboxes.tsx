import { Checkbox } from "@/components/ui/checkbox";
import { AVAILABLE_STAGES } from "../constants/stages";
import { useStagesCheckboxes } from "../hooks/useStagesCheckboxes";
import type { StagesCheckboxesProps } from "../types/registrationForm.types";

export const StagesCheckboxes = ({ form, isRegistering }: StagesCheckboxesProps) => {
  const { handleStageToggle, isStageChecked } = useStagesCheckboxes(form);

  return (
    <div className="space-y-3 text-right">
      <label className="text-sm font-medium">المراحل الدراسية (اختياري)</label>
      <div className="space-y-3 bg-secondary/20 rounded-2xl p-4 border border-border">
        {AVAILABLE_STAGES.map((stage) => (
          <div key={stage.id} className="flex items-center gap-3">
            <Checkbox
              id={stage.id}
              checked={isStageChecked(stage.label)}
              onCheckedChange={() => handleStageToggle(stage.label)}
              disabled={isRegistering}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <label
              htmlFor={stage.id}
              className="text-sm font-medium cursor-pointer select-none"
            >
              {stage.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

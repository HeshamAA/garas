import { useState, useCallback } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { SchoolFormData } from "./useAuthForm";

export const useStagesCheckboxes = (form: UseFormReturn<SchoolFormData>) => {
  const [selectedStages, setSelectedStages] = useState<string[]>(
    form.getValues("stages") || []
  );

  const handleStageToggle = useCallback(
    (stageLabel: string) => {
      const currentStages = form.getValues("stages") || [];
      const isSelected = currentStages.includes(stageLabel);

      let newStages: string[];
      if (isSelected) {
        newStages = currentStages.filter((s) => s !== stageLabel);
      } else {
        newStages = [...currentStages, stageLabel];
      }

      setSelectedStages(newStages);
      form.setValue("stages", newStages);
    },
    [form]
  );

  const isStageChecked = useCallback(
    (stageLabel: string) => {
      const currentStages = form.getValues("stages") || [];
      return currentStages.includes(stageLabel);
    },
    [form]
  );

  return {
    selectedStages,
    handleStageToggle,
    isStageChecked,
  };
};

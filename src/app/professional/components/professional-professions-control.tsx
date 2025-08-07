

import { OptionSelectorControl } from "@/components/ui/option-selector-control";
import { useProfessionalProfessionsControl } from "../hooks/use-professional-professions-control";

function ProfessionalProfessionsControl() {
  const {
    options,
    professions,
    handleAddProfession,
    handleRemoveProfession,
  } = useProfessionalProfessionsControl();

  return (
    <OptionSelectorControl
      emptyPlaceholder="Sin profesiones..."
      options={options}
      label="Profesiones"
      items={professions}
      onRemove={handleRemoveProfession}
      onAdd={handleAddProfession}
    />
  );
}

export { ProfessionalProfessionsControl };


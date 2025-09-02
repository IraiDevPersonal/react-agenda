import { OptionSelectorControl } from "@/components/ui/option-selector-control";

import { useUserProfessionsControl } from "../hooks/use-user-professions-control";

function UserProfessionsControl() {
  const { options, professions, handleAddProfession, handleRemoveProfession } =
    useUserProfessionsControl();

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

export { UserProfessionsControl };

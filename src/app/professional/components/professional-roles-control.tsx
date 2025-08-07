import { OptionSelectorControl } from "@/components/ui/option-selector-control";

import { useProfessionalRolesControl } from "../hooks/use-professional-roles-control";

function ProfessionalRolesControl() {
  const {
    options,
    roles,
    handleAddRole,
    handleRemoveRole,
  } = useProfessionalRolesControl();

  return (
    <OptionSelectorControl
      emptyPlaceholder="Sin roles..."
      options={options}
      label="Roles"
      items={roles}
      onRemove={handleRemoveRole}
      onAdd={handleAddRole}
    />
  );
}

export { ProfessionalRolesControl };

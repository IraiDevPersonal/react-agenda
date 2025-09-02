import { OptionSelectorControl } from "@/components/ui/option-selector-control";

import { useUserRolesControl } from "../hooks/use-user-roles-control";

function UserRolesControl() {
  const { options, roles, handleAddRole, handleRemoveRole } =
    useUserRolesControl();

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

export { UserRolesControl };

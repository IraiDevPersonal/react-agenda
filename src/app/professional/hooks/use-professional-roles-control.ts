import type { Option } from "@/lib/types/global-types";

import { useRolesStore } from "../stores/use-roles-store";
import { useProfessionalObserver } from "./use-professional-observer";

export function useProfessionalRolesControl() {
  const roles = useRolesStore(s => s.roles);
  const onAddRole = useRolesStore(s => s.onAddRole);
  const onRemoveRole = useRolesStore(s => s.onRemoveRole);
  const setRoles = useRolesStore(s => s.setRoles);

  useProfessionalObserver({ onSave: ({ roles }) => setRoles(roles) });

  // TODO: desde aqui se deberian obtener los roles const { data: options = [] } = useQueryRoles({ queryOptions: ProfessionQueries.forFitlers });
  const options: Option[] = [
    { label: "Administrador", value: "1" },
    { label: "Professional", value: "2" },
    { label: "Secretario(a)", value: "3" },
    { label: "Paciente", value: "4" },
  ];

  const filteredOptions = options.filter(p => !roles.map(sp => sp.id).includes(Number(p.value)));

  const handleAddRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const role = options.find(o => o.value === value);

    if (role) {
      onAddRole({
        id: Number(role.value),
        name: role.label,
      });
    }
  };

  const handleRemoveRole = (id: number) => {
    onRemoveRole(id);
  };

  return {
    handleAddRole,
    handleRemoveRole,
    options: filteredOptions,
    roles,
  };
}

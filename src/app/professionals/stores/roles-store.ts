import { create } from "zustand";

import type { ProfessionalRoleModel } from "../domain/models/professional-model";

type Store = {
  setRoles: (professions: ProfessionalRoleModel[]) => void;
  onAddRole: (role: ProfessionalRoleModel) => void;
  onRemoveRole: (id: number) => void;
  roles: ProfessionalRoleModel[];
};

export const useRolesStore = create<Store>(set => ({
  roles: [],
  onAddRole(role) {
    set(state => ({
      roles: [...state.roles, role],
    }));
  },
  onRemoveRole(id) {
    set(state => ({
      roles: state.roles.filter(role => role.id !== id),
    }));
  },
  setRoles(roles) {
    set({ roles });
  },
}));

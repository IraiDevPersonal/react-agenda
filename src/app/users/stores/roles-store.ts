import { create } from "zustand";

import type { UserRoleModel } from "../models/user-model";

type Store = {
  setRoles: (professions: UserRoleModel[]) => void;
  onAddRole: (role: UserRoleModel) => void;
  onRemoveRole: (id: number) => void;
  roles: UserRoleModel[];
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

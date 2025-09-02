import { create } from "zustand";

import type { UserProfessionModel } from "../models/user-model";

type Store = {
  setProfessions: (professions: UserProfessionModel[]) => void;
  onAddProfession: (profession: UserProfessionModel) => void;
  onRemoveProfession: (id: number) => void;
  professions: UserProfessionModel[];
};

export const useProfessionStore = create<Store>((set) => ({
  professions: [],
  onAddProfession(profession) {
    set((state) => ({
      professions: [...state.professions, profession],
    }));
  },
  onRemoveProfession(id) {
    set((state) => ({
      professions: state.professions.filter(
        (profession) => profession.id !== id,
      ),
    }));
  },
  setProfessions(professions) {
    set({ professions });
  },
}));

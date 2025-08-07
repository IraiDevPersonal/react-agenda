import { create } from "zustand";

import type { ProfessionalProfessionModel } from "../models/professional-model";

type Store = {
  professions: ProfessionalProfessionModel[];
  setProfessions: (professions: ProfessionalProfessionModel[]) => void;
  onAddProfession: (profession: ProfessionalProfessionModel) => void;
  onRemoveProfession: (id: number) => void;
};

export const useProfessionStore = create<Store>(set => ({
  professions: [],
  onAddProfession: profession => set(state => ({
    professions: [...state.professions, profession],
  })),
  onRemoveProfession: id => set(state => ({
    professions: state.professions.filter(profession => profession.id !== id),
  })),
  setProfessions: professions => set({ professions }),
}));

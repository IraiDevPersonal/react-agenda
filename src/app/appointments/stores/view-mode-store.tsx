import { create } from "zustand";

import type { AppointmentViewMode } from "../domain/models/type";

type Store = {
  setViewMode: (v: AppointmentViewMode) => void;
  viewMode: AppointmentViewMode;
};

export const useViewModeStore = create<Store>(set => ({
  viewMode: "week",
  setViewMode(v) {
    set({ viewMode: v });
  },
}));

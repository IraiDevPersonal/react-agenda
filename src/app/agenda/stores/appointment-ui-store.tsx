import { create } from "zustand";

import type { AppointmentViewMode } from "../types";

type Store = {
  onViewModeChange: (v: AppointmentViewMode) => void;
  viewMode: AppointmentViewMode;
};

export const useAppointmentUiStore = create<Store>(set => ({
  viewMode: "week",
  onViewModeChange(v) {
    set({ viewMode: v });
  },
}));

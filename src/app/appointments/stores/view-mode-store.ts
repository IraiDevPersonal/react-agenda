import { create } from "zustand";

import type { AppointmentViewMode } from "../models/shared-model";

type Store = {
  setViewMode: (v: Store["viewMode"]) => void;
  setAsDefaultViewMode: () => void;
  viewMode: AppointmentViewMode;
};

const DEFAULT_VIEW_MODE: Store["viewMode"] = "week";

export const useViewModeStore = create<Store>(set => ({
  viewMode: DEFAULT_VIEW_MODE,
  setViewMode(v) {
    set({ viewMode: v });
  },
  setAsDefaultViewMode() {
    set({ viewMode: DEFAULT_VIEW_MODE });
  },
}));

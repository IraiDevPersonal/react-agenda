import { create } from "zustand";

import { AppointmentViewMode } from "../models/shared-model";
import type { AppointmentViewMode as AppointmentViewModeType } from "../models/shared-model";

type Store = {
  setViewMode: (v: Store["viewMode"]) => void;
  setAsDefaultViewMode: () => void;
  viewMode: AppointmentViewModeType;
};

const DEFAULT_VIEW_MODE: Store["viewMode"] = AppointmentViewMode.week;

export const useViewModeStore = create<Store>(set => ({
  viewMode: DEFAULT_VIEW_MODE,
  setViewMode(v) {
    set({ viewMode: v });
  },
  setAsDefaultViewMode() {
    set({ viewMode: DEFAULT_VIEW_MODE });
  },
}));
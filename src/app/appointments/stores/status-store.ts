import { create } from "zustand";

import type { AppointmentStatus } from "../models/shared-model";

type Store = {
  status: AppointmentStatus | "ALL";
  setAsDefaultStatus: () => void;
  setStatus: (v: Store["status"]) => void;
  onChangeStatus: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const DEFAULT_STATUS: Store["status"] = "ALL";

export const useStatusStore = create<Store>(set => ({
  status: DEFAULT_STATUS,
  setStatus(v) {
    set({ status: v });
  },
  onChangeStatus(e) {
    set({ status: e.target.value as Store["status"] });
  },
  setAsDefaultStatus() {
    set({ status: DEFAULT_STATUS });
  },
}));

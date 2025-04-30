import { create } from "zustand";

import type { ViewTypes } from "../types/view.type";

type AgendaViewState = {
  view: ViewTypes;
  date: Date;
  setView: (view: ViewTypes) => void;
  setDate: (date: Date) => void;
};

export const useAgendaViewStore = create<AgendaViewState>(set => ({
  view: "month",
  date: new Date(),
  setView: view => set({ view }),
  setDate: date => set({ date }),
}));

import type { UseQueryStatesKeysMap } from "nuqs";

export enum AppointmentViewMode {
  week = "week",
  day = "day",
}

export enum AppointmentStatus {
  AVAILABLE = "AVAILABLE",
  TO_CONFIRM = "TO_CONFIRM",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  INDETERMINATE = "INDETERMINATE",
}

export type AppointmentFilters = UseQueryStatesKeysMap<{
  professional_id: number;
  profession_id: number;
  patient_rut: string;
  date_from: Date;
  date_to: Date;
  date: Date;
}>;

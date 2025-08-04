import type { FiltersWithPagination } from "@/lib/types/global-types";

export enum PatientStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
};

export type PatientFilters = FiltersWithPagination<{
  status: string;
  email: string;
  name: string;
  rut: string;
}>;

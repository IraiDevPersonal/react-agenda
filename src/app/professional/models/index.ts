import type { FiltersWithPagination } from "@/lib/types/global-types";

export type ProfessionalFilters = FiltersWithPagination<{
  profession_id: number;
  last_names: string;
  names: string;
  email: string;
  rut: string;
  id: number;
}>;

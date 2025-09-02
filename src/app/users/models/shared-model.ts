import type { UseQueryStatesKeysMap } from "nuqs";

import type { FiltersWithPagination } from "@/lib/types/global-types";

export type UserFilters = UseQueryStatesKeysMap<FiltersWithPagination<{
  profession_id: number;
  last_names: string;
  names: string;
  email: string;
  rut: string;
  id: number;
}>>;

export enum UserStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
  INACTIVE = "INACTIVE",
}

export enum UserGender {
  MASCULINE = "MA",
  FEMENINE = "FE",
}

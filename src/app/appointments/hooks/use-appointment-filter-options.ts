import { useQuery } from "@tanstack/react-query";

import { professionQuery } from "@/app/professions/container";
import { userQuery } from "@/app/users/container";

import { useAppointmentFilters } from "./use-appointment-filters";

export function useAppointmentFilterOptions() {
  const { filters } = useAppointmentFilters();
  const { data: professionOptions = [] } = useQuery({
    ...professionQuery.forFitlers(),
    enabled: true,
  });

  const { data: userOptions = [] } = useQuery({
    ...userQuery.forFilters(),
    enabled: !!filters.profession_id,
  });

  const filteredUserOptions = userOptions.filter(opt =>
    opt.professions.includes(filters.profession_id?.toString() ?? ""),
  );

  return {
    professionOptions,
    filteredUserOptions,
  };
}

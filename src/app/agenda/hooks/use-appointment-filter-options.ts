import { professionQueryOptions } from "@/app/profession/queries/profession-query";
import { useQuery } from "@tanstack/react-query";

import { professionalQueryOptions } from "@/app/professional/queries/professional-query";

import { useAppointmentFilters } from "./use-appointment-filters";

export function useAppointmentFilterOptions() {
  const { filters } = useAppointmentFilters();
  const { data: professionOptions = [] } = useQuery({
    enabled: true,
    ...professionQueryOptions.forFitlers(),
  });

  const { data: professionalOptions = [] } = useQuery({
    enabled: true,
    ...professionalQueryOptions.forFitlers(),
  });

  const filteredProfessionals = professionalOptions.filter(opt =>
    filters.profession_id ? opt.professions.includes(+filters.profession_id) : true,
  );

  return {
    professionOptions,
    filteredProfessionals,
  };
}

import { useQuery } from "@tanstack/react-query";

import { professionQuery } from "@/app/profession/container";
import { professionalQuery } from "@/app/professionals/container";

import { useAppointmentFilters } from "./use-appointment-filters";

export function useAppointmentFilterOptions() {
  const { filters } = useAppointmentFilters();
  const { data: professionOptions = [] } = useQuery({
    ...professionQuery.forFitlers(),
    enabled: true,
  });

  const { data: professionalOptions = [] } = useQuery({
    ...professionalQuery.forFilters(),
    enabled: true,
  });

  const filteredProfessionals = professionalOptions.filter(opt =>
    filters.profession_id ? opt.professions.includes(filters.profession_id.toString()) : true,
  );

  return {
    professionOptions,
    filteredProfessionals,
  };
}

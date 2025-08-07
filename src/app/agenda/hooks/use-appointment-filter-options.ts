import { useQuery } from "@tanstack/react-query";

import { ProfessionQueries } from "@/app/profession/queries/profession-queries";
import { ProfessionalQuery } from "@/app/professional/queries/professional-queries";

import { useAppointmentFilters } from "./use-appointment-filters";

export function useAppointmentFilterOptions() {
  const { filters } = useAppointmentFilters();
  const { data: professionOptions = [] } = useQuery({
    enabled: true,
    ...ProfessionQueries.forFitlers(),
  });

  const { data: professionalOptions = [] } = useQuery({
    enabled: true,
    ...ProfessionalQuery.forFitlers(),
  });

  const filteredProfessionals = professionalOptions.filter(opt =>
    filters.profession_id ? opt.professions.includes(filters.profession_id.toString()) : true,
  );

  return {
    professionOptions,
    filteredProfessionals,
  };
}

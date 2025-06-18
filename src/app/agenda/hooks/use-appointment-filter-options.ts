import { useQuery } from "@tanstack/react-query";

import { getProfessionForFilterQueryOptions } from "@/app/profession/queries/profession.query";
import { getProfessionalForFilterQueryOptions } from "@/app/professional/queries/professional.query";

import { useAppointmentFilters } from "./use-appointment-filters";

export function useAppointmentFilterOptions() {
  const { filters } = useAppointmentFilters();
  const { data: professionOptions = [] } = useQuery({
    enabled: true,
    ...getProfessionForFilterQueryOptions(),
  });

  const { data: professionalOptions = [] } = useQuery({
    enabled: true,
    ...getProfessionalForFilterQueryOptions(),
  });

  const filteredProfessionals = professionalOptions.filter(opt =>
    filters.profession_id ? opt.professions.includes(+filters.profession_id) : true,
  );

  return {
    professionOptions,
    filteredProfessionals,
  };
}

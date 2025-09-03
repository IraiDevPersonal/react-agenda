import { useQuery } from "@tanstack/react-query";
import { professionalQuery } from "@/app/professional/container";
import { professionQuery } from "@/app/professions/container";
import { useAppointmentFilters } from "./use-appointment-filters";

export function useAppointmentFilterOptions() {
  const { filters } = useAppointmentFilters();
  const { data: professionOptions = [] } = useQuery({
    ...professionQuery.forFitlers(),
    enabled: true,
  });

  const { data: professionalOptions = [] } = useQuery({
    ...professionalQuery.forFilters(),
    enabled: !!filters.profession_id,
  });

  const filteredUserOptions = professionalOptions.filter((opt) =>
    opt.professions.includes(filters.profession_id?.toString() ?? ""),
  );

  return {
    professionOptions,
    filteredUserOptions,
  };
}

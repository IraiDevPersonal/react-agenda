import { useAppointmentFilters } from "./use-appointment-filters";

export function useClearAppointmentFilters() {
  const { filters, onFilter } = useAppointmentFilters();

  const handleClearAllFilters = () => {
    onFilter({
      professional_id: null,
      profession_id: null,
      patient_rut: null,
      date_from: null,
      date_to: null,
      date: null,
    });
  };

  const hasQueries = Object.values(filters).some(v => v);

  return {
    hasQueries,
    handleClearAllFilters,
  };
}

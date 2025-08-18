import { SelectNative } from "@/components/ui/select-native";

import { useAppointmentFilters } from "../hooks/use-appointment-filters";
import { AppointmentViewMode } from "../models/type";
import { useViewModeStore } from "../stores/view-mode-store";

function AppointmentViewModeSelector() {
  const { handleViewModeChange } = useAppointmentFilters();
  const viewMode = useViewModeStore(s => s.viewMode);

  return (
    <>
      <SelectNative
        value={viewMode}
        withEmptyOption={false}
        onChange={handleViewModeChange}
        options={[
          { label: "Día", value: AppointmentViewMode.day },
          { label: "Semana", value: AppointmentViewMode.week },
        ]}
      />
    </>
  );
}

export { AppointmentViewModeSelector };

import { Show } from "@/components/show";

import { useViewModeStore } from "../stores/view-mode-store";
import { DayAppointmentsView } from "./day-appointments-view";
import { WeekAppointmentsView } from "./week-appointments-view";

function AppointmentViewSelector() {
  const viewMode = useViewModeStore(s => s.viewMode);
  return (
    <div className="overflow-x-auto">
      <Show when={viewMode === "day"}>
        <DayAppointmentsView />
      </Show>

      <Show when={viewMode === "week"}>
        <WeekAppointmentsView />
      </Show>
    </div>
  );
}

export { AppointmentViewSelector };

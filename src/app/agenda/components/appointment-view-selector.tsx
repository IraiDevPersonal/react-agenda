import { Show } from "@/components/show";

import { useAppointmentUiStore } from "../stores/appointment-ui-store";
import { DayAppointmentsView } from "./day-appointments-view";
import { WeekAppointmentsView } from "./week-appointments-view";

function AppointmentViewSelector() {
  const viewMode = useAppointmentUiStore(s => s.viewMode);
  return (
    <>
      <Show when={viewMode === "day"}>
        <DayAppointmentsView />
      </Show>

      <Show when={viewMode === "week"}>
        <WeekAppointmentsView />
      </Show>
    </>
  );
}

export { AppointmentViewSelector };

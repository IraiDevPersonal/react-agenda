import { DayAppointmentsView } from "./day-appointments-view";
import { WeekAppointmentsView } from "./week-appointments-view";

function AppointmentViewSelector() {
  return (
    <>
      <WeekAppointmentsView />
      <DayAppointmentsView />
    </>
  );
}

export { AppointmentViewSelector };

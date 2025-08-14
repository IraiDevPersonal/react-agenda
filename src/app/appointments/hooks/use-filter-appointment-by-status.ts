import type { AppointmentModel } from "../domain/models/appointment-model";

import { useStatusStore } from "../stores/status-store";

export function useFilterAppointmentByStatus({ appointments = [] }: { appointments?: AppointmentModel[] }) {
  const status = useStatusStore(s => s.status);

  return appointments.filter(app => status === "ALL" ? app : app.appointment_status === status);
}

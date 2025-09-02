import type { AppointmentModel } from "../models/appointment-model";

import { useStatusStore } from "../stores/status-store";

export function useFilterAppointmentByStatus({ appointments = [] }: { appointments?: AppointmentModel[] }) {
  const status = useStatusStore(s => s.status);

  return appointments.filter(app => status === "ALL" ? app : app.status === status);
}

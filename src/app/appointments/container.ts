import { agendaClient } from "@/api/agenda-client";

import { AppointmentQuery } from "./query";
import { AppointmentService } from "./service";

const appointmentService = new AppointmentService({
  client: agendaClient,
  endpoint: "/appointments",
});

export const appointmentQuery = new AppointmentQuery(appointmentService);

import { agendaService } from "@/services/agenda-service";

import { AppointmentQuery } from "./query";
import { AppointmentService } from "./service";

const appointmentService = new AppointmentService({
  client: agendaService,
  endpoint: "/appointments",
});

export const appointmentQuery = new AppointmentQuery(appointmentService);

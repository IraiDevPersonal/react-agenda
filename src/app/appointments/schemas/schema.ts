import z from "zod";

import { AppointmentStatus } from "../models/type";

export const AppointmentStatusSchema = z.enum(AppointmentStatus, {
  error: "estado de cita invalido",
});

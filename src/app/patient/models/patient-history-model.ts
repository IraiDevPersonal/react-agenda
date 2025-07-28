import z from "zod";

import { AppointmentStatus } from "@/app/agenda/models/appointment-model";

export const PatientHistorySchema = z.object({
  uid: z.string(),
  date_time: z.string(),
  status: z.enum(AppointmentStatus),
});

export type PatientHistoryModel = z.infer<typeof PatientHistorySchema>;

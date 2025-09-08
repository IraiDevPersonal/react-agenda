import z from "zod";

import { AppointmentStatusSchema } from "@/app/appointments/schemas/api/appointment-schema";
import { UidScheme } from "@/lib/schemas/global-schemas";

export const ApiPatientHistorySchema = z.object({
  uid: UidScheme,
  date: z.string(),
  time_to: z.string(),
  time_from: z.string(),
  status: AppointmentStatusSchema,
});

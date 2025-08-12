import z from "zod";

import { AppointmentStatusSchema } from "@/app/appointments/domain/schemas/schema";
import { UidScheme } from "@/lib/schemas/global-schemas";

export const ApiPatientHistorySchema = z.object({
  uid: UidScheme,
  date_time: z.string(),
  status: AppointmentStatusSchema,
});

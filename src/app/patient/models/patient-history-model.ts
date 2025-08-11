import z from "zod";

import { AppointmentStatusSchema } from "@/app/agenda/domain/schemas/schema";
import { UidScheme } from "@/lib/schemas/global-schemas";

export const PatientHistorySchema = z.object({
  uid: UidScheme,
  date_time: z.string(),
  status: AppointmentStatusSchema,
});

export type PatientHistoryModel = z.infer<typeof PatientHistorySchema>;

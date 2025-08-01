import z from "zod";

import { AppointmentStatusScheme } from "@/app/agenda/models";
import { UidScheme } from "@/lib/schemas/global-schemas";

export const PatientHistorySchema = z.object({
  uid: UidScheme,
  date_time: z.string(),
  status: AppointmentStatusScheme,
});

export type PatientHistoryModel = z.infer<typeof PatientHistorySchema>;

import z from "zod";

import { ApiPatientHistorySchema } from "@/app/patients/schemas/api/patient-history-schema";
import { ApiPatientSchema } from "@/app/patients/schemas/api/patient-schema";
import { ApiProfessionalForAppointmentDetailSchema } from "@/app/professionals/schemas/api/professional-for-appointment-detail-schema";

import { AppointmentStatusSchema } from "./appointment-schema";

export const ApiAppointmentDetailSchema = z.object({
  uid: z.string(),
  date: z.string(),
  time_to: z.string(),
  time_from: z.string(),
  is_enabled: z.boolean(),
  status: AppointmentStatusSchema,
  alert: z.object({
    message: z.string(),
    is_required: z.boolean(),
  }),
  patient_history: z.array(ApiPatientHistorySchema),
  professional: ApiProfessionalForAppointmentDetailSchema,
  patient: ApiPatientSchema.omit({ is_deleted: true }).nullable(),
});

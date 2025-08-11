import z from "zod";

import { PatientHistorySchema } from "@/app/patient/models/patient-history-model";
import { PatientSchema } from "@/app/patient/models/patient-model";
import { ApiProfessionalForAppointmentDetailSchema } from "@/app/professionals/domain/schemas/professional-for-appointment-detail-schema";

import { AppointmentStatusSchema } from "./schema";

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
  patient_history: z.array(PatientHistorySchema),
  professional: ApiProfessionalForAppointmentDetailSchema,
  patient: PatientSchema.omit({ is_deleted: true }).nullable(),
});

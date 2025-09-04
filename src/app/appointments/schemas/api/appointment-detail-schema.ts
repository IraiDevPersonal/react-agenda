import z from "zod";

import { ApiPatientForAppointmentDetailSchema } from "@/app/patients/schemas/api/patient-for-appointment-detail-schema";
import { ApiProfessionalForAppointmentDetailSchema } from "@/app/professional/schemas/api/professional-for-appointment-detail-schema";

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
  patient: ApiPatientForAppointmentDetailSchema,
  professional: ApiProfessionalForAppointmentDetailSchema,
});

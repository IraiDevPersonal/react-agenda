import type z from "zod";

import type { PatientFormSchema } from "../schemas/patient-form-schema";

export type PatientFormValues = z.infer<typeof PatientFormSchema>;

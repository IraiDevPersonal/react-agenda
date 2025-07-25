import { toast } from "sonner";

import { QueryKeys } from "@/constants/query-keys";
import { CustomError } from "@/lib/custom-error";
import { queryClient } from "@/lib/query-client";

import type { UpsertActionState } from "../models/patient-model";

import { PatientFormSchema } from "../models/patient-model";
import { PatientActions } from "./patient-actions";

async function updatePatient(prevState: UpsertActionState, formData: FormData) {
  const form = Object.fromEntries(formData);
  try {
    const { uid, ...patientForm } = PatientFormSchema.parse({
      ...prevState.data,
      ...form,
    });
    const { data, message } = await PatientActions.updatePatient(uid, patientForm);
    queryClient.invalidateQueries({ queryKey: [QueryKeys.patients] });
    toast.error(message);

    return {
      success: true,
      data,
    };
  }
  catch (error) {
    const { message } = CustomError.getError(error);
    toast.error(message);
    return {
      success: false,
      data: { ...prevState, ...form as any },
    };
  }
}

async function createPatient(prevState: UpsertActionState, formData: FormData) {
  const form = Object.fromEntries(formData);
  try {
    const patientForm = PatientFormSchema.omit({ uid: true }).parse({
      ...prevState.data,
      ...form,
    });
    const { data, message } = await PatientActions.createPatient(patientForm);
    queryClient.invalidateQueries({ queryKey: [QueryKeys.patients] });
    toast.error(message);

    return {
      success: true,
      data,
    };
  }
  catch (error) {
    const { message } = CustomError.getError(error);
    toast.error(message);
    return {
      success: false,
      data: { ...prevState, ...form as any },
    };
  }
}

export const PatientMutations = {
  updatePatient,
  createPatient,
};

import type { StringifyObject } from "@/lib/types/global-types";

import type { PatientFilters } from "./models";
import type { PatientModel, PatientResponseModel } from "./models/patient-model";

import { PatientQueries } from "./queries/patient-queries";

function updatePatientCache(old: PatientResponseModel, patient: PatientModel) {
  return {
    ...old,
    data: old.data.map(oldPatient => oldPatient.uid === patient.uid ? patient : oldPatient),
  };
}

export function setPatientQueryData(params: StringifyObject<PatientFilters>) {
  return {
    querykey: [...PatientQueries.getAll(params).queryKey],
    updateCache: updatePatientCache,
  };
}

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

import { PatientQueryOptions } from "../queries/patient-queries";
import { PatientServices } from "../services/patient-services";
import { Patient } from "./patient";

function UpdatePatientPresenter() {
  const { patientUid = "" } = useParams();
  const {
    data: patient,
    isLoading,
    isError,
    error,
  }
  = useQuery(PatientQueryOptions.getDetail(patientUid));

  if (isError) {
    return (
      <p>
        {error.message}
      </p>
    );
  }

  if (isLoading) {
    return <p>cargando...</p>;
  }

  return (
    <>
      <Patient
        patient={patient?.data}
        upsertService={payload => PatientServices.updatePatient(patientUid, payload)}
      >
        <Patient.Data>
          <Patient.Image />
        </Patient.Data>
      </Patient>
    </>
  );
}

export { UpdatePatientPresenter };

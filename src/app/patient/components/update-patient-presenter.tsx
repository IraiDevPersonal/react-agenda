import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

import { PatientQueryOptions } from "../queries/patient-queries";
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
      <Patient patient={patient?.data}>
        <Patient.Data
          fullname={`${patient?.data.names} ${patient?.data.last_names}`}
          uid={patient?.data.uid ?? ""}
        >
          <Patient.Image />
        </Patient.Data>
      </Patient>
    </>
  );
}

export { UpdatePatientPresenter };

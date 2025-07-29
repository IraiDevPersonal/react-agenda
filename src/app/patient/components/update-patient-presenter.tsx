import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

import { ErrorMessage } from "@/components/ui/error-message";

import { PatientQueryOptions } from "../queries/patient-queries";
import { PatientServices } from "../services/patient-services";
import { Patient } from "./patient";
import { PatientSkeleton } from "./patient-skeleton";

function UpdatePatientPresenter() {
  const { patientUid = "" } = useParams();
  const {
    refetch,
    data: patient,
    isFetching,
    isLoading,
    isError,
    error,
  }
  = useQuery(PatientQueryOptions.getDetail(patientUid));

  if (isError) {
    return <ErrorMessage onRetry={refetch}>{error.message}</ErrorMessage>;
  }

  if (isLoading) {
    return <PatientSkeleton />;
  }

  return (
    <>
      <Patient
        patient={patient?.data}
        upsertService={payload => PatientServices.updatePatient(patientUid, payload)}
      >
        {
          isFetching
            ? (
                <PatientSkeleton.Data>
                  <Patient.Image />
                </PatientSkeleton.Data>
              )
            : (
                <Patient.Data>
                  <Patient.Image />
                </Patient.Data>
              )
        }
      </Patient>
    </>
  );
}

export { UpdatePatientPresenter };

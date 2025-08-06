import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

import { ErrorMessage } from "@/components/ui/error-message";

import { PatientQuery } from "../queries/patient-queries";
import { PatientServices } from "../services/patient-services";
import { Patient } from "./patient";
import { PatientSkeleton } from "./patient-skeleton";

function UpdatePatientView() {
  const { patientUid = "" } = useParams();
  const {
    refetch,
    data: patient,
    isFetching,
    isLoading,
    isError,
    error,
  }
  = useQuery(PatientQuery.getDetail(patientUid));

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
        upsertService={payload => PatientServices.update(patientUid, payload)}
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

export { UpdatePatientView };

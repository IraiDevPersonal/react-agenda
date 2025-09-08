import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

import { ErrorMessage } from "@/components/ui/error-message";

import { patientQuery, patientService } from "../container";
import { Patient } from "./patient";
import { PatientSkeleton } from "./patient-skeleton";

function UpdatePatientView() {
  const { patientUid = "" } = useParams();
  const {
    refetch,
    data: patient,
    isLoading,
    isError,
    error,
  } = useQuery(patientQuery.detail(patientUid));

  if (isError) {
    return <ErrorMessage onRetry={refetch}>{error.message}</ErrorMessage>;
  }

  if (isLoading) {
    return <PatientSkeleton />;
  }

  return (
    <Patient
      patient={patient?.data}
      upsertService={(payload) =>
        patientService.updatePatient(patientUid, payload)
      }
    >
      {/* {isFetching ? (
        <PatientSkeleton.Data>
          <Patient.Image />
        </PatientSkeleton.Data>
      ) : ( */}
      <Patient.Data>
        <Patient.Image />
      </Patient.Data>
      {/* )} */}
    </Patient>
  );
}

export { UpdatePatientView };

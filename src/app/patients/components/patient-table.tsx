import { useQuery } from "@tanstack/react-query";

import { ErrorMessage } from "@/components/ui/error-message";
import { Table } from "@/components/ui/table";

import { patientQuery } from "../container";
import { usePatientFilters } from "../hooks/use-patient-filters";
import { PatientTableHeader } from "./patient-table-header";
import { PatientTableRows } from "./patient-table-rows";

function PatientTable() {
  const { filters } = usePatientFilters();
  const {
    isLoadingError,
    error,
    refetch,
  } = useQuery(patientQuery.forLoader(filters));

  if (isLoadingError) {
    return <ErrorMessage onRetry={refetch}>{error.message}</ErrorMessage>;
  }

  return (
    <Table.Container>
      <Table>
        <PatientTableHeader />
        <Table.Body>
          <PatientTableRows />
        </Table.Body>
      </Table>
    </Table.Container>
  );
}

export { PatientTable };

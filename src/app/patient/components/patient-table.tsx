import { ErrorMessage } from "@/components/ui/error-message";
import { Table } from "@/components/ui/table";

import { useQueryPatients } from "../hooks/use-query-patients";
import { PatientQuery } from "../queries/patient-queries";
import { PatientTableHeader } from "./patient-table-header";
import { PatientTableRows } from "./patient-table-rows";

function PatientTable() {
  const {
    isLoadingError,
    error,
    refetch,
  } = useQueryPatients({
    queryOptions: PatientQuery.getPatientLoaderState,
  });

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

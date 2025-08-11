import { useQuery } from "@tanstack/react-query";

import { ErrorMessage } from "@/components/ui/error-message";
import { Table } from "@/components/ui/table";

import { useProfessionalFilters } from "../hooks/use-professional-filters";
import { professionalQuery } from "../container";
import { ProfessionalTableHeader } from "./professional-table-header";
import { ProfessionalTableRows } from "./professional-table-rows";

function ProfessionalTable() {
  const { filters } = useProfessionalFilters();
  const {
    isLoadingError,
    error,
    refetch,
  } = useQuery(professionalQuery.forLoader(filters));

  if (isLoadingError) {
    return <ErrorMessage onRetry={refetch}>{error.message}</ErrorMessage>;
  }

  return (
    <Table.Container>
      <Table>
        <ProfessionalTableHeader />
        <Table.Body>
          <ProfessionalTableRows />
        </Table.Body>
      </Table>
    </Table.Container>
  );
}

export { ProfessionalTable };

import { ErrorMessage } from "@/components/ui/error-message";
import { Table } from "@/components/ui/table";

import { useQueryProfessionals } from "../hooks/use-query-professionals";
import { ProfessionalQuery } from "../queries/professional-queries";
import { ProfessionalTableHeader } from "./professional-table-header";
import { ProfessionalTableRows } from "./professional-table-rows";

function ProfessionalTable() {
  const {
    isLoadingError,
    error,
    refetch,
  } = useQueryProfessionals({
    queryOptions: ProfessionalQuery.getLoaderState,
  });

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

import { useQuery } from "@tanstack/react-query";

import { ErrorMessage } from "@/components/ui/error-message";
import { Table } from "@/components/ui/table";

import { userQuery } from "../container";
import { useUserFilters } from "../hooks/use-user-filters";
import { UserTableHeader } from "./user-table-header";
import { UserTableRows } from "./user-table-rows";

function UserTable() {
  const { filters } = useUserFilters();
  const { isLoadingError, error, refetch } = useQuery(
    userQuery.forLoader(filters),
  );

  if (isLoadingError) {
    return <ErrorMessage onRetry={refetch}>{error.message}</ErrorMessage>;
  }

  return (
    <Table.Container>
      <Table>
        <UserTableHeader />
        <Table.Body>
          <UserTableRows />
        </Table.Body>
      </Table>
    </Table.Container>
  );
}

export { UserTable };

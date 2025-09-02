import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";

import { SearchPatient } from "@/app/patients/components/search-patient";
import { PatientStatus } from "@/app/patients/models/shared-model";
import { Search } from "@/components/ui/search";
import { SelectNative } from "@/components/ui/select-native";
import { Table } from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { userQuery } from "../container";
import { useUserFilters } from "../hooks/use-user-filters";

function UserTableHeader() {
  const { filters, onFilter } = useUserFilters();
  const { isFetching } = useQuery(userQuery.forLoader(filters));

  return (
    <Table.Header>
      <Table.HeaderRow>
        <Table.Head className="w-[286px]">Nombre</Table.Head>
        <Table.Head className="w-[147px]">Rut</Table.Head>
        <Table.Head className="w-[229px]">Correo</Table.Head>
        <Table.Head className="w-[206px]">Dirección</Table.Head>
        {/* <Table.Head className="w-[136px]">Profesiones</Table.Head> */}
        <Table.Head className="w-[136px]">Estado</Table.Head>
        <Table.Head className="w-[98px]">
          {isFetching && <Loader2Icon size={20} className="animate-spin" />}
        </Table.Head>
      </Table.HeaderRow>

      <Table.HeaderFilterRow>
        <Table.Head>
          <Search
            autoFocus
            classNames={{ input: "table-filter-field" }}
            onSearch={(v) => onFilter({ names: v })}
            placeholder="Buscar por nombre..."
            defaultValue={filters.names ?? ""}
            searchIconSize={16}
            key={filters.names}
          />
        </Table.Head>
        <Table.Head>
          <SearchPatient
            classNames={{ input: "table-filter-field", root: "w-36" }}
            onSearch={(v) => onFilter({ rut: v })}
            defaultValue={filters.rut ?? ""}
            placeholder="Buscar por rut..."
            searchIconSize={16}
            key={filters.rut}
          />
        </Table.Head>
        <Table.Head>
          <Search
            classNames={{ input: "table-filter-field" }}
            onSearch={(v) => onFilter({ email: v })}
            placeholder="Buscar por correo..."
            defaultValue={filters.email ?? ""}
            searchIconSize={16}
            key={filters.email}
          />
        </Table.Head>
        <Table.Head></Table.Head>
        {/* <Table.Head></Table.Head> */}
        <Table.Head>
          <SelectNative
            options={[
              { value: PatientStatus.ACTIVE, label: "Habilitados" },
              { value: PatientStatus.INACTIVE, label: "Deshabilitados" },
            ]}
            // onChange={e => onFilter({ status: e.target.value })}
            className={cn("table-filter-field", "max-w-max")}
            // value={filters.status ?? ""}
          />
        </Table.Head>
        <Table.Head></Table.Head>
      </Table.HeaderFilterRow>
    </Table.Header>
  );
}

export { UserTableHeader };

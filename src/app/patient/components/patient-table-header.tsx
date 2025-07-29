import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";

import { Search } from "@/components/ui/search";
import { SelectNative } from "@/components/ui/select-native";
import { Table } from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { usePatientFilterController } from "../hooks/use-patient-filter-controller";
import { usePatientFilters } from "../hooks/use-patient-filters";
import { PatientStatus } from "../models";
import { PatientQueryOptions } from "../queries/patient-queries";

function PatientTableHeader() {
  const {
    filters,
    emailRef,
    nameRef,
    rutRef,
    onFilter,
    handelSearch,
    handleClearSearch,
  } = usePatientFilterController();
  const { filtersAsParams } = usePatientFilters();
  const { isFetching } = useQuery(PatientQueryOptions.getPatientLoaderState(filtersAsParams));

  return (
    <Table.Header>
      <Table.HeaderRow>
        <Table.Head>Nombre</Table.Head>
        <Table.Head>Rut</Table.Head>
        <Table.Head>Correo</Table.Head>
        <Table.Head>Dirección</Table.Head>
        <Table.Head align="center">Estado</Table.Head>
        <Table.Head align="center">
          {isFetching && <Loader2Icon size={20} className="animate-spin" />}
        </Table.Head>
      </Table.HeaderRow>

      <Table.HeaderFilterRow>
        <Table.Head>
          <Search
            ref={nameRef}
            searchIconSize={16}
            placeholder="Buscar por nombre..."
            classNames={{ input: "table-filter-field" }}
            defaultValue={filters.name ?? ""}
            onSearch={v => handelSearch(v, "name")}
            onClearValue={() => handleClearSearch("name")}
          />
        </Table.Head>
        <Table.Head>
          <Search
            ref={rutRef}
            searchIconSize={16}
            placeholder="Buscar por rut..."
            classNames={{ input: "table-filter-field", root: "w-36" }}
            defaultValue={filters.rut ?? ""}
            onSearch={v => handelSearch(v, "rut")}
            onClearValue={() => handleClearSearch("rut")}
          />
        </Table.Head>
        <Table.Head>
          <Search
            ref={emailRef}
            searchIconSize={16}
            placeholder="Buscar por correo..."
            classNames={{ input: "table-filter-field" }}
            defaultValue={filters.email ?? ""}
            onSearch={v => handelSearch(v, "email")}
            onClearValue={() => handleClearSearch("email")}
          />
        </Table.Head>
        <Table.Head></Table.Head>
        <Table.Head>
          <SelectNative
            className={cn("table-filter-field", "max-w-max")}
            options={[
              { value: PatientStatus.ACTIVE, label: "Habilitados" },
              { value: PatientStatus.INACTIVE, label: "Deshabilitados" },
            ]}
            value={filters.status ?? ""}
            onChange={e => onFilter({ status: e.target.value })}
          />
        </Table.Head>
        <Table.Head></Table.Head>
      </Table.HeaderFilterRow>
    </Table.Header>
  );
}

export { PatientTableHeader };
